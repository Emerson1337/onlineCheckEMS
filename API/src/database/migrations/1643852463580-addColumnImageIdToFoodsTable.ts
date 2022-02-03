import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnImageIdToFoodsTable1643852463580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('Foods', new TableColumn({
            name: "image_id",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Foods', 'image_id')
    }

}
