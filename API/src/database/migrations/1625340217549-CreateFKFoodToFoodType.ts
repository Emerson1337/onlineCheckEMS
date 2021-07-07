import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKFoodToFoodType1625340217549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'Foods',
            new TableForeignKey({
                name: 'FKFoodToFoodType',
                columnNames: ['foodType'],
                referencedTableName: 'FoodTypes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Foods', 'FKFoodToFoodType');
    }

}
