import { MigrationInterface, QueryRunner } from "typeorm";

export class alterColumnToTagFood1632874190562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('Foods', 'foodType', 'tagFood');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('Foods', 'tagFood', 'foodType');

    }

}
