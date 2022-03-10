import { response } from 'express';
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import UsersRepository from "../repositories/UsersRepository";

interface InfoRestaurant {
  enterprise: string,
  phone_number: string,
  delivery_fee: number
}

class RestaurantInfoService {
  public async createOrUpdate({ enterprise, phone_number, delivery_fee }: InfoRestaurant, enterpriseId: string) {
    const restaurantInfoRepository = getCustomRepository(UsersRepository);

    let schema = yup.object().shape({
      enterprise: yup.string().required('O nome da empresa é obrigatório.'),
      phone_number: yup.number().required('O campo número de telefone é obrigatório'),
      delivery_fee: yup.string().required('O campo taxa de entrega é obrigatório')
    });

    await schema.validate({ enterprise, phone_number, delivery_fee }).catch((err) => {
      throw new Error(err.errors);
    });

    const specialCharacters = "/([!@#$%&*+=[]/{}|:<>])";

    for (let i = 0; i < specialCharacters.length; i++) {
      if (enterprise.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
    }

    const infoAlreadyExists = await restaurantInfoRepository.findOne({ phone_number });

    if (!infoAlreadyExists) {
      await restaurantInfoRepository.clear();
      const restaurantInfo = restaurantInfoRepository.create({
        enterprise,
        phone_number,
        delivery_fee
      });

      await restaurantInfoRepository.save(restaurantInfo);
      return restaurantInfo;
    } else {
      const restaurantInfo = restaurantInfoRepository.update(enterpriseId, {
        enterprise,
        phone_number,
        delivery_fee
      });

      return restaurantInfo;
    }
  }

  public async listInfo(enterpriseId: string) {
    const restaurantInfoRepository = getCustomRepository(UsersRepository);

    const restaurantInfo = await restaurantInfoRepository.findOne(enterpriseId);
    return restaurantInfo;
  }
}

export default RestaurantInfoService;