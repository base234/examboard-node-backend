import User from '#models/User'

export default class UserTransformer {
  public static async transform(user: User) {

    // Fetch role instance dynamically
    const roleInstance: any = await user.getRoleInstance();

    return {
      id: user.uuid,
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`.trim(),
      email: user.email,
      phone_number: user.phone_number,
      is_email_verified: user.is_email_verified,
      is_phone_number_verified: user.is_phone_number_verified,
      is_onboarding_complete: user.is_onboarding_complete,
      role: user.role,

      // Conditional if the user is a customer
      ...(user.role === 'teacher' && {
        teacher: {
        id: roleInstance.uuid,
        first_name: roleInstance.first_name,
        last_name: roleInstance.last_name,
        email: roleInstance.email,
      }}),

      // Conditional if the user is an admin
      ...(user.role === 'admin' && {
        admin: {
          id: roleInstance.uuid,
          first_name: roleInstance.first_name,
          last_name: roleInstance.last_name,
          email: roleInstance.email,
        }
      }),

      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }
  }

  public static async collection(users: User[]) {
    return Promise.all(users.map((user) => this.transform(user)))
  }
}
