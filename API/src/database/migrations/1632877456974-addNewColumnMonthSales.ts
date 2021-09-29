import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addNewColumnMonthSales1632877456974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('MonthSales', new TableColumn({
            name: "description",
            type: "varchar"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('MonthSales', 'description')
    }

}
