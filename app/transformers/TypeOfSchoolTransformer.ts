import TypeOfSchool from '#models/type_of_school'

export default class TypeOfSchoolTransformer {
  public static async transform(type_of_school: TypeOfSchool) {

    return {
      id: type_of_school.uuid,
      flag: type_of_school.flag,
      display_flag: type_of_school.display_flag,
      created_at: type_of_school.createdAt,
      updated_at: type_of_school.updatedAt,
    }
  }

  public static async collection(type_of_schools: TypeOfSchool[]) {
    return Promise.all(type_of_schools.map((type_of_school) => this.transform(type_of_school)))
  }
}
