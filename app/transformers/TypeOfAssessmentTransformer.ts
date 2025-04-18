import TypeOfAssessment from '#models/type_of_assessment'

export default class TypeOfAssessmentTransformer {
  public static async transform(type_of_assessment: TypeOfAssessment) {

    return {
      id: type_of_assessment.uuid,
      flag: type_of_assessment.flag,
      display_flag: type_of_assessment.display_flag,
      description: type_of_assessment.description,
      created_at: type_of_assessment.createdAt,
      updated_at: type_of_assessment.updatedAt,
    }
  }

  public static async collection(type_of_assessments: TypeOfAssessment[]) {
    return Promise.all(type_of_assessments.map((type_of_assessment) => this.transform(type_of_assessment)))
  }
}
