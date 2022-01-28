import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ColumnNullableToTableRestaurantInfo1643326722097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('restaurant_info', 'logo', new TableColumn({
            name: "logo",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('restaurant_info', 'logo', new TableColumn({
            name: "logo",
            type: "varchar",
            isNullable: false
        }))
    }

}
