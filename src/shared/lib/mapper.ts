/**
 * Base abstract class for mapping between Domain models and Persistence (API) shapes.
 *
 * Every entity/feature mapper must extend this class and implement both methods.
 * This ensures a consistent contract for data transformation across the app.
 *
 * @typeParam Domain - The internal model used by components and business logic.
 * @typeParam Persistence - The shape returned/expected by the API.
 *
 * @example
 * ```ts
 * interface Customer {
 *     id: string
 *     fullName: string
 *     email: string
 * }
 *
 * interface CustomerPersistence {
 *     customer_id: string
 *     full_name: string
 *     email_address: string
 * }
 *
 * class CustomerMapper extends Mapper<Customer, CustomerPersistence> {
 *     toDomain(raw: CustomerPersistence): Customer {
 *         return {
 *             id: raw.customer_id,
 *             fullName: raw.full_name,
 *             email: raw.email_address,
 *         }
 *     }
 *
 *     toPersistence(domain: Customer): CustomerPersistence {
 *         return {
 *             customer_id: domain.id,
 *             full_name: domain.fullName,
 *             email_address: domain.email,
 *         }
 *     }
 * }
 * ```
 */
export abstract class Mapper<Domain, Persistence> {
    abstract toDomain(raw: Persistence): Domain;
    abstract toPersistence(domain: Domain): Persistence;
}
