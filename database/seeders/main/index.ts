import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import app from '@adonisjs/core/services/app'

export default class Index extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    // if (
    //   !Seeder.default.environment ||
    //   (!Seeder.default.environment.includes('development') && app.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && app.inTest) ||
    //   (!Seeder.default.environment.includes('production') && app.inProduction)
    // ) {
    //   return
    // }

    await new Seeder.default(this.client).run()
  }

  async run() {
    // await this.seed(await import('#database/seeders/type_of_question_seeder'))
    // await this.seed(await import('#database/seeders/subject_categories_seeder'))
    // await this.seed(await import('#database/seeders/subjects_seeder'))
    // await this.seed(await import('#database/seeders/school_type_seeder'))
    // await this.seed(await import('#database/seeders/school_level_seeder'))
    // await this.seed(await import('#database/seeders/school_classes_seeder'))
    await this.seed(await import('#database/seeders/type_of_assessment_seeder'))
  }
}
