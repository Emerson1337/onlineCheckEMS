import { getCustomRepository } from "typeorm";
import RestaurantInfoRespository from "../repositories/RestaurantInfoRepository";
import * as yup from 'yup';

interface InfoRestaurant {
  name: string,
  phone_number: string,
  delivery_fee: number
}

class RestaurantInfoService {
  public async createOrUpdate({ name, phone_number, delivery_fee }: InfoRestaurant) {
    const restaurantInfoRepository = getCustomRepository(RestaurantInfoRespository);

    let schema = yup.object().shape({
      name: yup.string().required('O nome da comida é obrigatório.'),
      phone_number: yup.number().required('O campo número de telefone é obrigatório'),
      delivery_fee: yup.string().required('O campo taxa de entrega é obrigatório')
    });

    await schema.validate({ name, phone_number, delivery_fee }).catch((err) => {
      throw new Error(err.errors);
    });

    const specialCharacters = "/([!@#$%&*+=[]/{}|:<>])";

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
    }

    const infoAlreadyExists = await restaurantInfoRepository.findOne({ phone_number });

    if (!infoAlreadyExists) {
      await restaurantInfoRepository.clear();
      const restaurantInfo = restaurantInfoRepository.create({
        name,
        phone_number,
        delivery_fee
      });

      await restaurantInfoRepository.save(restaurantInfo);
      return restaurantInfo;
    } else {
      const restaurantInfo = restaurantInfoRepository.update({ phone_number }, {
        name,
        phone_number,
        delivery_fee
      });

      return restaurantInfo;
    }
  }

  public async listInfo() {
    const restaurantInfoRepository = getCustomRepository(RestaurantInfoRespository);

    const restaurantInfo = await restaurantInfoRepository.findOne();
    return restaurantInfo;
  }
}

export default RestaurantInfoService;