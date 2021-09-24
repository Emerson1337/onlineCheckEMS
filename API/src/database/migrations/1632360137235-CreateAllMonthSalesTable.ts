import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAllMonthSalesTable1632360137235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'MonthSales',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'nameFood',
                        type: 'varchar',
                    },
                    {
                        name: 'tagFood',
                        type: 'varchar'
                    },
                    {
                        name: 'priceFood',
                        type: 'float'
                    },
                    {
                        name: 'frequency',
                        type: 'int'
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
        await queryRunner.dropTable('MonthSales');
    }

}
