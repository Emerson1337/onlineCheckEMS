import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addFkToTables1646793009986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Foods", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("Foods", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("BestSellingCategory", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("BestSellingCategory", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("BestSellingFood", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("BestSellingFood", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("FoodTypes", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("FoodTypes", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("MoneyMonthly", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("MoneyMonthly", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("MonthSales", new TableColumn({
            name: "restaurant_id",
            type: 'uuid',
        }));

        await queryRunner.createForeignKey("MonthSales", new TableForeignKey({
            columnNames: ["restaurant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "CASCADE"
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Foods', 'restaurant_id');
        await queryRunner.dropColumn('Foods', 'restaurant_id');
        await queryRunner.dropForeignKey('BestSellingCategory', 'restaurant_id');
        await queryRunner.dropColumn('BestSellingCategory', 'restaurant_id');
        await queryRunner.dropForeignKey('BestSellingFood', 'restaurant_id');
        await queryRunner.dropColumn('BestSellingFood', 'restaurant_id');
        await queryRunner.dropForeignKey('FoodTypes', 'restaurant_id');
        await queryRunner.dropColumn('FoodTypes', 'restaurant_id');
        await queryRunner.dropForeignKey('MoneyMonthly', 'restaurant_id');
        await queryRunner.dropColumn('MoneyMonthly', 'restaurant_id');
        await queryRunner.dropForeignKey('MonthSales', 'restaurant_id');
        await queryRunner.dropColumn('MonthSales', 'restaurant_id');
        }

}
