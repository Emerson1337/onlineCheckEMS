import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NewTableInfoRestaurant1643245577998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'restaurant_info',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'logo',
                        type: 'varchar'
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar'
                    },
                    {
                        name: 'delivery_fee',
                        type: 'float'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurant_info');
    }

}
