import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addRestaurantInfoToUser1646795340862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('Users', [
            new TableColumn({
                name: 'enterprise',
                type: 'varchar',
            }),
            new TableColumn({
                name: 'logo',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'phone_number',
                type: 'varchar'
            }),
            new TableColumn({
                name: 'delivery_fee',
                type: 'float'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Users', 'enterprise');
        await queryRunner.dropColumn('Users', 'logo');
        await queryRunner.dropColumn('Users', 'phone_number');
        await queryRunner.dropColumn('Users', 'delivery_fee');

    }

}
