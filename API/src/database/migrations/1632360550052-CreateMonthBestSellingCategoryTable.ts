import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMonthBestSellingCategoryTable1632360550052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'BestSellingCategory',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'month',
                        type: 'varchar',
                    },
                    {
                        name: 'tagFood',
                        type: 'varchar'
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
        await queryRunner.dropTable('BestSellingCategory');
    }
}
