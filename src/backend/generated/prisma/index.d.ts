
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserLocation
 * 
 */
export type UserLocation = $Result.DefaultSelection<Prisma.$UserLocationPayload>
/**
 * Model UserPoly
 * 
 */
export type UserPoly = $Result.DefaultSelection<Prisma.$UserPolyPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model EventLocation
 * 
 */
export type EventLocation = $Result.DefaultSelection<Prisma.$EventLocationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userLocation`: Exposes CRUD operations for the **UserLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLocations
    * const userLocations = await prisma.userLocation.findMany()
    * ```
    */
  get userLocation(): Prisma.UserLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPoly`: Exposes CRUD operations for the **UserPoly** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPolies
    * const userPolies = await prisma.userPoly.findMany()
    * ```
    */
  get userPoly(): Prisma.UserPolyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventLocation`: Exposes CRUD operations for the **EventLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventLocations
    * const eventLocations = await prisma.eventLocation.findMany()
    * ```
    */
  get eventLocation(): Prisma.EventLocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserLocation: 'UserLocation',
    UserPoly: 'UserPoly',
    Event: 'Event',
    EventLocation: 'EventLocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userLocation" | "userPoly" | "event" | "eventLocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserLocation: {
        payload: Prisma.$UserLocationPayload<ExtArgs>
        fields: Prisma.UserLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          findFirst: {
            args: Prisma.UserLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          findMany: {
            args: Prisma.UserLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>[]
          }
          delete: {
            args: Prisma.UserLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          update: {
            args: Prisma.UserLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          deleteMany: {
            args: Prisma.UserLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>[]
          }
          aggregate: {
            args: Prisma.UserLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserLocation>
          }
          groupBy: {
            args: Prisma.UserLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserLocationCountArgs<ExtArgs>
            result: $Utils.Optional<UserLocationCountAggregateOutputType> | number
          }
        }
      }
      UserPoly: {
        payload: Prisma.$UserPolyPayload<ExtArgs>
        fields: Prisma.UserPolyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPolyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPolyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>
          }
          findFirst: {
            args: Prisma.UserPolyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPolyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>
          }
          findMany: {
            args: Prisma.UserPolyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>[]
          }
          delete: {
            args: Prisma.UserPolyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>
          }
          update: {
            args: Prisma.UserPolyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>
          }
          deleteMany: {
            args: Prisma.UserPolyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPolyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPolyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPolyPayload>[]
          }
          aggregate: {
            args: Prisma.UserPolyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPoly>
          }
          groupBy: {
            args: Prisma.UserPolyGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPolyGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPolyCountArgs<ExtArgs>
            result: $Utils.Optional<UserPolyCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      EventLocation: {
        payload: Prisma.$EventLocationPayload<ExtArgs>
        fields: Prisma.EventLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>
          }
          findFirst: {
            args: Prisma.EventLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>
          }
          findMany: {
            args: Prisma.EventLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>[]
          }
          delete: {
            args: Prisma.EventLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>
          }
          update: {
            args: Prisma.EventLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>
          }
          deleteMany: {
            args: Prisma.EventLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLocationPayload>[]
          }
          aggregate: {
            args: Prisma.EventLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventLocation>
          }
          groupBy: {
            args: Prisma.EventLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventLocationCountArgs<ExtArgs>
            result: $Utils.Optional<EventLocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userLocation?: UserLocationOmit
    userPoly?: UserPolyOmit
    event?: EventOmit
    eventLocation?: EventLocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friends: number
    friendOf: number
    events: number
    likedEvents: number
    polygons: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | UserCountOutputTypeCountFriendsArgs
    friendOf?: boolean | UserCountOutputTypeCountFriendOfArgs
    events?: boolean | UserCountOutputTypeCountEventsArgs
    likedEvents?: boolean | UserCountOutputTypeCountLikedEventsArgs
    polygons?: boolean | UserCountOutputTypeCountPolygonsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPolygonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPolyWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    likes: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likes?: boolean | EventCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    preferences: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    preferences: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    avatar: number
    preferences: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    preferences?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    preferences?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    preferences?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    preferences: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    preferences?: boolean
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    likedEvents?: boolean | User$likedEventsArgs<ExtArgs>
    polygons?: boolean | User$polygonsArgs<ExtArgs>
    geoLocation?: boolean | User$geoLocationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    preferences?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    preferences?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    preferences?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "avatar" | "preferences", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    likedEvents?: boolean | User$likedEventsArgs<ExtArgs>
    polygons?: boolean | User$polygonsArgs<ExtArgs>
    geoLocation?: boolean | User$geoLocationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friends: Prisma.$UserPayload<ExtArgs>[]
      friendOf: Prisma.$UserPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      likedEvents: Prisma.$EventPayload<ExtArgs>[]
      polygons: Prisma.$UserPolyPayload<ExtArgs>[]
      geoLocation: Prisma.$UserLocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      avatar: string | null
      preferences: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friends<T extends User$friendsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendOf<T extends User$friendOfArgs<ExtArgs> = {}>(args?: Subset<T, User$friendOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likedEvents<T extends User$likedEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    polygons<T extends User$polygonsArgs<ExtArgs> = {}>(args?: Subset<T, User$polygonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    geoLocation<T extends User$geoLocationArgs<ExtArgs> = {}>(args?: Subset<T, User$geoLocationArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly preferences: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friends
   */
  export type User$friendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.friendOf
   */
  export type User$friendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.likedEvents
   */
  export type User$likedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.polygons
   */
  export type User$polygonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    where?: UserPolyWhereInput
    orderBy?: UserPolyOrderByWithRelationInput | UserPolyOrderByWithRelationInput[]
    cursor?: UserPolyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPolyScalarFieldEnum | UserPolyScalarFieldEnum[]
  }

  /**
   * User.geoLocation
   */
  export type User$geoLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    where?: UserLocationWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserLocation
   */

  export type AggregateUserLocation = {
    _count: UserLocationCountAggregateOutputType | null
    _min: UserLocationMinAggregateOutputType | null
    _max: UserLocationMaxAggregateOutputType | null
  }

  export type UserLocationMinAggregateOutputType = {
    id: string | null
    streetAddress: string | null
    userId: string | null
  }

  export type UserLocationMaxAggregateOutputType = {
    id: string | null
    streetAddress: string | null
    userId: string | null
  }

  export type UserLocationCountAggregateOutputType = {
    id: number
    streetAddress: number
    userId: number
    _all: number
  }


  export type UserLocationMinAggregateInputType = {
    id?: true
    streetAddress?: true
    userId?: true
  }

  export type UserLocationMaxAggregateInputType = {
    id?: true
    streetAddress?: true
    userId?: true
  }

  export type UserLocationCountAggregateInputType = {
    id?: true
    streetAddress?: true
    userId?: true
    _all?: true
  }

  export type UserLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLocation to aggregate.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLocations
    **/
    _count?: true | UserLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLocationMaxAggregateInputType
  }

  export type GetUserLocationAggregateType<T extends UserLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLocation[P]>
      : GetScalarType<T[P], AggregateUserLocation[P]>
  }




  export type UserLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLocationWhereInput
    orderBy?: UserLocationOrderByWithAggregationInput | UserLocationOrderByWithAggregationInput[]
    by: UserLocationScalarFieldEnum[] | UserLocationScalarFieldEnum
    having?: UserLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLocationCountAggregateInputType | true
    _min?: UserLocationMinAggregateInputType
    _max?: UserLocationMaxAggregateInputType
  }

  export type UserLocationGroupByOutputType = {
    id: string
    streetAddress: string
    userId: string
    _count: UserLocationCountAggregateOutputType | null
    _min: UserLocationMinAggregateOutputType | null
    _max: UserLocationMaxAggregateOutputType | null
  }

  type GetUserLocationGroupByPayload<T extends UserLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLocationGroupByOutputType[P]>
            : GetScalarType<T[P], UserLocationGroupByOutputType[P]>
        }
      >
    >


  export type UserLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streetAddress?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLocation"]>


  export type UserLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streetAddress?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLocation"]>

  export type UserLocationSelectScalar = {
    id?: boolean
    streetAddress?: boolean
    userId?: boolean
  }

  export type UserLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streetAddress" | "userId", ExtArgs["result"]["userLocation"]>
  export type UserLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streetAddress: string
      userId: string
    }, ExtArgs["result"]["userLocation"]>
    composites: {}
  }

  type UserLocationGetPayload<S extends boolean | null | undefined | UserLocationDefaultArgs> = $Result.GetResult<Prisma.$UserLocationPayload, S>

  type UserLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserLocationCountAggregateInputType | true
    }

  export interface UserLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLocation'], meta: { name: 'UserLocation' } }
    /**
     * Find zero or one UserLocation that matches the filter.
     * @param {UserLocationFindUniqueArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserLocationFindUniqueArgs>(args: SelectSubset<T, UserLocationFindUniqueArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserLocationFindUniqueOrThrowArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindFirstArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserLocationFindFirstArgs>(args?: SelectSubset<T, UserLocationFindFirstArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindFirstOrThrowArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLocations
     * const userLocations = await prisma.userLocation.findMany()
     * 
     * // Get first 10 UserLocations
     * const userLocations = await prisma.userLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLocationWithIdOnly = await prisma.userLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserLocationFindManyArgs>(args?: SelectSubset<T, UserLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a UserLocation.
     * @param {UserLocationDeleteArgs} args - Arguments to delete one UserLocation.
     * @example
     * // Delete one UserLocation
     * const UserLocation = await prisma.userLocation.delete({
     *   where: {
     *     // ... filter to delete one UserLocation
     *   }
     * })
     * 
     */
    delete<T extends UserLocationDeleteArgs>(args: SelectSubset<T, UserLocationDeleteArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserLocation.
     * @param {UserLocationUpdateArgs} args - Arguments to update one UserLocation.
     * @example
     * // Update one UserLocation
     * const userLocation = await prisma.userLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserLocationUpdateArgs>(args: SelectSubset<T, UserLocationUpdateArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserLocations.
     * @param {UserLocationDeleteManyArgs} args - Arguments to filter UserLocations to delete.
     * @example
     * // Delete a few UserLocations
     * const { count } = await prisma.userLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserLocationDeleteManyArgs>(args?: SelectSubset<T, UserLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLocations
     * const userLocation = await prisma.userLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserLocationUpdateManyArgs>(args: SelectSubset<T, UserLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLocations and returns the data updated in the database.
     * @param {UserLocationUpdateManyAndReturnArgs} args - Arguments to update many UserLocations.
     * @example
     * // Update many UserLocations
     * const userLocation = await prisma.userLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserLocations and only return the `id`
     * const userLocationWithIdOnly = await prisma.userLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of UserLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationCountArgs} args - Arguments to filter UserLocations to count.
     * @example
     * // Count the number of UserLocations
     * const count = await prisma.userLocation.count({
     *   where: {
     *     // ... the filter for the UserLocations we want to count
     *   }
     * })
    **/
    count<T extends UserLocationCountArgs>(
      args?: Subset<T, UserLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLocationAggregateArgs>(args: Subset<T, UserLocationAggregateArgs>): Prisma.PrismaPromise<GetUserLocationAggregateType<T>>

    /**
     * Group by UserLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLocationGroupByArgs['orderBy'] }
        : { orderBy?: UserLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLocation model
   */
  readonly fields: UserLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserLocation model
   */
  interface UserLocationFieldRefs {
    readonly id: FieldRef<"UserLocation", 'String'>
    readonly streetAddress: FieldRef<"UserLocation", 'String'>
    readonly userId: FieldRef<"UserLocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserLocation findUnique
   */
  export type UserLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation findUniqueOrThrow
   */
  export type UserLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation findFirst
   */
  export type UserLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLocations.
     */
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation findFirstOrThrow
   */
  export type UserLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLocations.
     */
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation findMany
   */
  export type UserLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocations to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation update
   */
  export type UserLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLocation.
     */
    data: XOR<UserLocationUpdateInput, UserLocationUncheckedUpdateInput>
    /**
     * Choose, which UserLocation to update.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation updateMany
   */
  export type UserLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLocations.
     */
    data: XOR<UserLocationUpdateManyMutationInput, UserLocationUncheckedUpdateManyInput>
    /**
     * Filter which UserLocations to update
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to update.
     */
    limit?: number
  }

  /**
   * UserLocation updateManyAndReturn
   */
  export type UserLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * The data used to update UserLocations.
     */
    data: XOR<UserLocationUpdateManyMutationInput, UserLocationUncheckedUpdateManyInput>
    /**
     * Filter which UserLocations to update
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserLocation delete
   */
  export type UserLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter which UserLocation to delete.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation deleteMany
   */
  export type UserLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLocations to delete
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to delete.
     */
    limit?: number
  }

  /**
   * UserLocation without action
   */
  export type UserLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
  }


  /**
   * Model UserPoly
   */

  export type AggregateUserPoly = {
    _count: UserPolyCountAggregateOutputType | null
    _min: UserPolyMinAggregateOutputType | null
    _max: UserPolyMaxAggregateOutputType | null
  }

  export type UserPolyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    activeFlag: string | null
  }

  export type UserPolyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    activeFlag: string | null
  }

  export type UserPolyCountAggregateOutputType = {
    id: number
    userId: number
    activeFlag: number
    _all: number
  }


  export type UserPolyMinAggregateInputType = {
    id?: true
    userId?: true
    activeFlag?: true
  }

  export type UserPolyMaxAggregateInputType = {
    id?: true
    userId?: true
    activeFlag?: true
  }

  export type UserPolyCountAggregateInputType = {
    id?: true
    userId?: true
    activeFlag?: true
    _all?: true
  }

  export type UserPolyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPoly to aggregate.
     */
    where?: UserPolyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPolies to fetch.
     */
    orderBy?: UserPolyOrderByWithRelationInput | UserPolyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPolyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPolies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPolies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPolies
    **/
    _count?: true | UserPolyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPolyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPolyMaxAggregateInputType
  }

  export type GetUserPolyAggregateType<T extends UserPolyAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPoly]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPoly[P]>
      : GetScalarType<T[P], AggregateUserPoly[P]>
  }




  export type UserPolyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPolyWhereInput
    orderBy?: UserPolyOrderByWithAggregationInput | UserPolyOrderByWithAggregationInput[]
    by: UserPolyScalarFieldEnum[] | UserPolyScalarFieldEnum
    having?: UserPolyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPolyCountAggregateInputType | true
    _min?: UserPolyMinAggregateInputType
    _max?: UserPolyMaxAggregateInputType
  }

  export type UserPolyGroupByOutputType = {
    id: string
    userId: string
    activeFlag: string
    _count: UserPolyCountAggregateOutputType | null
    _min: UserPolyMinAggregateOutputType | null
    _max: UserPolyMaxAggregateOutputType | null
  }

  type GetUserPolyGroupByPayload<T extends UserPolyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPolyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPolyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPolyGroupByOutputType[P]>
            : GetScalarType<T[P], UserPolyGroupByOutputType[P]>
        }
      >
    >


  export type UserPolySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    activeFlag?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPoly"]>


  export type UserPolySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    activeFlag?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPoly"]>

  export type UserPolySelectScalar = {
    id?: boolean
    userId?: boolean
    activeFlag?: boolean
  }

  export type UserPolyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "activeFlag", ExtArgs["result"]["userPoly"]>
  export type UserPolyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPolyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserPolyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPoly"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      activeFlag: string
    }, ExtArgs["result"]["userPoly"]>
    composites: {}
  }

  type UserPolyGetPayload<S extends boolean | null | undefined | UserPolyDefaultArgs> = $Result.GetResult<Prisma.$UserPolyPayload, S>

  type UserPolyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPolyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPolyCountAggregateInputType | true
    }

  export interface UserPolyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPoly'], meta: { name: 'UserPoly' } }
    /**
     * Find zero or one UserPoly that matches the filter.
     * @param {UserPolyFindUniqueArgs} args - Arguments to find a UserPoly
     * @example
     * // Get one UserPoly
     * const userPoly = await prisma.userPoly.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPolyFindUniqueArgs>(args: SelectSubset<T, UserPolyFindUniqueArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPoly that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPolyFindUniqueOrThrowArgs} args - Arguments to find a UserPoly
     * @example
     * // Get one UserPoly
     * const userPoly = await prisma.userPoly.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPolyFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPolyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPoly that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyFindFirstArgs} args - Arguments to find a UserPoly
     * @example
     * // Get one UserPoly
     * const userPoly = await prisma.userPoly.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPolyFindFirstArgs>(args?: SelectSubset<T, UserPolyFindFirstArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPoly that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyFindFirstOrThrowArgs} args - Arguments to find a UserPoly
     * @example
     * // Get one UserPoly
     * const userPoly = await prisma.userPoly.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPolyFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPolyFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPolies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPolies
     * const userPolies = await prisma.userPoly.findMany()
     * 
     * // Get first 10 UserPolies
     * const userPolies = await prisma.userPoly.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPolyWithIdOnly = await prisma.userPoly.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPolyFindManyArgs>(args?: SelectSubset<T, UserPolyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a UserPoly.
     * @param {UserPolyDeleteArgs} args - Arguments to delete one UserPoly.
     * @example
     * // Delete one UserPoly
     * const UserPoly = await prisma.userPoly.delete({
     *   where: {
     *     // ... filter to delete one UserPoly
     *   }
     * })
     * 
     */
    delete<T extends UserPolyDeleteArgs>(args: SelectSubset<T, UserPolyDeleteArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPoly.
     * @param {UserPolyUpdateArgs} args - Arguments to update one UserPoly.
     * @example
     * // Update one UserPoly
     * const userPoly = await prisma.userPoly.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPolyUpdateArgs>(args: SelectSubset<T, UserPolyUpdateArgs<ExtArgs>>): Prisma__UserPolyClient<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPolies.
     * @param {UserPolyDeleteManyArgs} args - Arguments to filter UserPolies to delete.
     * @example
     * // Delete a few UserPolies
     * const { count } = await prisma.userPoly.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPolyDeleteManyArgs>(args?: SelectSubset<T, UserPolyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPolies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPolies
     * const userPoly = await prisma.userPoly.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPolyUpdateManyArgs>(args: SelectSubset<T, UserPolyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPolies and returns the data updated in the database.
     * @param {UserPolyUpdateManyAndReturnArgs} args - Arguments to update many UserPolies.
     * @example
     * // Update many UserPolies
     * const userPoly = await prisma.userPoly.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPolies and only return the `id`
     * const userPolyWithIdOnly = await prisma.userPoly.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserPolyUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPolyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPolyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of UserPolies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyCountArgs} args - Arguments to filter UserPolies to count.
     * @example
     * // Count the number of UserPolies
     * const count = await prisma.userPoly.count({
     *   where: {
     *     // ... the filter for the UserPolies we want to count
     *   }
     * })
    **/
    count<T extends UserPolyCountArgs>(
      args?: Subset<T, UserPolyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPolyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPoly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPolyAggregateArgs>(args: Subset<T, UserPolyAggregateArgs>): Prisma.PrismaPromise<GetUserPolyAggregateType<T>>

    /**
     * Group by UserPoly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPolyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPolyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPolyGroupByArgs['orderBy'] }
        : { orderBy?: UserPolyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPolyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPolyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPoly model
   */
  readonly fields: UserPolyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPoly.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPolyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPoly model
   */
  interface UserPolyFieldRefs {
    readonly id: FieldRef<"UserPoly", 'String'>
    readonly userId: FieldRef<"UserPoly", 'String'>
    readonly activeFlag: FieldRef<"UserPoly", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserPoly findUnique
   */
  export type UserPolyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter, which UserPoly to fetch.
     */
    where: UserPolyWhereUniqueInput
  }

  /**
   * UserPoly findUniqueOrThrow
   */
  export type UserPolyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter, which UserPoly to fetch.
     */
    where: UserPolyWhereUniqueInput
  }

  /**
   * UserPoly findFirst
   */
  export type UserPolyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter, which UserPoly to fetch.
     */
    where?: UserPolyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPolies to fetch.
     */
    orderBy?: UserPolyOrderByWithRelationInput | UserPolyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPolies.
     */
    cursor?: UserPolyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPolies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPolies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPolies.
     */
    distinct?: UserPolyScalarFieldEnum | UserPolyScalarFieldEnum[]
  }

  /**
   * UserPoly findFirstOrThrow
   */
  export type UserPolyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter, which UserPoly to fetch.
     */
    where?: UserPolyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPolies to fetch.
     */
    orderBy?: UserPolyOrderByWithRelationInput | UserPolyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPolies.
     */
    cursor?: UserPolyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPolies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPolies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPolies.
     */
    distinct?: UserPolyScalarFieldEnum | UserPolyScalarFieldEnum[]
  }

  /**
   * UserPoly findMany
   */
  export type UserPolyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter, which UserPolies to fetch.
     */
    where?: UserPolyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPolies to fetch.
     */
    orderBy?: UserPolyOrderByWithRelationInput | UserPolyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPolies.
     */
    cursor?: UserPolyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPolies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPolies.
     */
    skip?: number
    distinct?: UserPolyScalarFieldEnum | UserPolyScalarFieldEnum[]
  }

  /**
   * UserPoly update
   */
  export type UserPolyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPoly.
     */
    data: XOR<UserPolyUpdateInput, UserPolyUncheckedUpdateInput>
    /**
     * Choose, which UserPoly to update.
     */
    where: UserPolyWhereUniqueInput
  }

  /**
   * UserPoly updateMany
   */
  export type UserPolyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPolies.
     */
    data: XOR<UserPolyUpdateManyMutationInput, UserPolyUncheckedUpdateManyInput>
    /**
     * Filter which UserPolies to update
     */
    where?: UserPolyWhereInput
    /**
     * Limit how many UserPolies to update.
     */
    limit?: number
  }

  /**
   * UserPoly updateManyAndReturn
   */
  export type UserPolyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * The data used to update UserPolies.
     */
    data: XOR<UserPolyUpdateManyMutationInput, UserPolyUncheckedUpdateManyInput>
    /**
     * Filter which UserPolies to update
     */
    where?: UserPolyWhereInput
    /**
     * Limit how many UserPolies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPoly delete
   */
  export type UserPolyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
    /**
     * Filter which UserPoly to delete.
     */
    where: UserPolyWhereUniqueInput
  }

  /**
   * UserPoly deleteMany
   */
  export type UserPolyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPolies to delete
     */
    where?: UserPolyWhereInput
    /**
     * Limit how many UserPolies to delete.
     */
    limit?: number
  }

  /**
   * UserPoly without action
   */
  export type UserPolyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPoly
     */
    select?: UserPolySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPoly
     */
    omit?: UserPolyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPolyInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    textDescription: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    textDescription: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    images: number
    textDescription: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    textDescription?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    textDescription?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    images?: true
    textDescription?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    userId: string
    title: string
    images: string[]
    textDescription: string
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    images?: boolean
    textDescription?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Event$likesArgs<ExtArgs>
    geoLocation?: boolean | Event$geoLocationArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    images?: boolean
    textDescription?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    images?: boolean
    textDescription?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    images?: boolean
    textDescription?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "images" | "textDescription", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Event$likesArgs<ExtArgs>
    geoLocation?: boolean | Event$geoLocationArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      likes: Prisma.$UserPayload<ExtArgs>[]
      geoLocation: Prisma.$EventLocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      images: string[]
      textDescription: string
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    likes<T extends Event$likesArgs<ExtArgs> = {}>(args?: Subset<T, Event$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    geoLocation<T extends Event$geoLocationArgs<ExtArgs> = {}>(args?: Subset<T, Event$geoLocationArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly userId: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly images: FieldRef<"Event", 'String[]'>
    readonly textDescription: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.likes
   */
  export type Event$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Event.geoLocation
   */
  export type Event$geoLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    where?: EventLocationWhereInput
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model EventLocation
   */

  export type AggregateEventLocation = {
    _count: EventLocationCountAggregateOutputType | null
    _min: EventLocationMinAggregateOutputType | null
    _max: EventLocationMaxAggregateOutputType | null
  }

  export type EventLocationMinAggregateOutputType = {
    id: string | null
    streetAddress: string | null
    eventId: string | null
  }

  export type EventLocationMaxAggregateOutputType = {
    id: string | null
    streetAddress: string | null
    eventId: string | null
  }

  export type EventLocationCountAggregateOutputType = {
    id: number
    streetAddress: number
    eventId: number
    _all: number
  }


  export type EventLocationMinAggregateInputType = {
    id?: true
    streetAddress?: true
    eventId?: true
  }

  export type EventLocationMaxAggregateInputType = {
    id?: true
    streetAddress?: true
    eventId?: true
  }

  export type EventLocationCountAggregateInputType = {
    id?: true
    streetAddress?: true
    eventId?: true
    _all?: true
  }

  export type EventLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLocation to aggregate.
     */
    where?: EventLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLocations to fetch.
     */
    orderBy?: EventLocationOrderByWithRelationInput | EventLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventLocations
    **/
    _count?: true | EventLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventLocationMaxAggregateInputType
  }

  export type GetEventLocationAggregateType<T extends EventLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateEventLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventLocation[P]>
      : GetScalarType<T[P], AggregateEventLocation[P]>
  }




  export type EventLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventLocationWhereInput
    orderBy?: EventLocationOrderByWithAggregationInput | EventLocationOrderByWithAggregationInput[]
    by: EventLocationScalarFieldEnum[] | EventLocationScalarFieldEnum
    having?: EventLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventLocationCountAggregateInputType | true
    _min?: EventLocationMinAggregateInputType
    _max?: EventLocationMaxAggregateInputType
  }

  export type EventLocationGroupByOutputType = {
    id: string
    streetAddress: string
    eventId: string
    _count: EventLocationCountAggregateOutputType | null
    _min: EventLocationMinAggregateOutputType | null
    _max: EventLocationMaxAggregateOutputType | null
  }

  type GetEventLocationGroupByPayload<T extends EventLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventLocationGroupByOutputType[P]>
            : GetScalarType<T[P], EventLocationGroupByOutputType[P]>
        }
      >
    >


  export type EventLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streetAddress?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventLocation"]>


  export type EventLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streetAddress?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventLocation"]>

  export type EventLocationSelectScalar = {
    id?: boolean
    streetAddress?: boolean
    eventId?: boolean
  }

  export type EventLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streetAddress" | "eventId", ExtArgs["result"]["eventLocation"]>
  export type EventLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventLocation"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streetAddress: string
      eventId: string
    }, ExtArgs["result"]["eventLocation"]>
    composites: {}
  }

  type EventLocationGetPayload<S extends boolean | null | undefined | EventLocationDefaultArgs> = $Result.GetResult<Prisma.$EventLocationPayload, S>

  type EventLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventLocationCountAggregateInputType | true
    }

  export interface EventLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventLocation'], meta: { name: 'EventLocation' } }
    /**
     * Find zero or one EventLocation that matches the filter.
     * @param {EventLocationFindUniqueArgs} args - Arguments to find a EventLocation
     * @example
     * // Get one EventLocation
     * const eventLocation = await prisma.eventLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventLocationFindUniqueArgs>(args: SelectSubset<T, EventLocationFindUniqueArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventLocationFindUniqueOrThrowArgs} args - Arguments to find a EventLocation
     * @example
     * // Get one EventLocation
     * const eventLocation = await prisma.eventLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, EventLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationFindFirstArgs} args - Arguments to find a EventLocation
     * @example
     * // Get one EventLocation
     * const eventLocation = await prisma.eventLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventLocationFindFirstArgs>(args?: SelectSubset<T, EventLocationFindFirstArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationFindFirstOrThrowArgs} args - Arguments to find a EventLocation
     * @example
     * // Get one EventLocation
     * const eventLocation = await prisma.eventLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, EventLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventLocations
     * const eventLocations = await prisma.eventLocation.findMany()
     * 
     * // Get first 10 EventLocations
     * const eventLocations = await prisma.eventLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventLocationWithIdOnly = await prisma.eventLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventLocationFindManyArgs>(args?: SelectSubset<T, EventLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a EventLocation.
     * @param {EventLocationDeleteArgs} args - Arguments to delete one EventLocation.
     * @example
     * // Delete one EventLocation
     * const EventLocation = await prisma.eventLocation.delete({
     *   where: {
     *     // ... filter to delete one EventLocation
     *   }
     * })
     * 
     */
    delete<T extends EventLocationDeleteArgs>(args: SelectSubset<T, EventLocationDeleteArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventLocation.
     * @param {EventLocationUpdateArgs} args - Arguments to update one EventLocation.
     * @example
     * // Update one EventLocation
     * const eventLocation = await prisma.eventLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventLocationUpdateArgs>(args: SelectSubset<T, EventLocationUpdateArgs<ExtArgs>>): Prisma__EventLocationClient<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventLocations.
     * @param {EventLocationDeleteManyArgs} args - Arguments to filter EventLocations to delete.
     * @example
     * // Delete a few EventLocations
     * const { count } = await prisma.eventLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventLocationDeleteManyArgs>(args?: SelectSubset<T, EventLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventLocations
     * const eventLocation = await prisma.eventLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventLocationUpdateManyArgs>(args: SelectSubset<T, EventLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventLocations and returns the data updated in the database.
     * @param {EventLocationUpdateManyAndReturnArgs} args - Arguments to update many EventLocations.
     * @example
     * // Update many EventLocations
     * const eventLocation = await prisma.eventLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventLocations and only return the `id`
     * const eventLocationWithIdOnly = await prisma.eventLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, EventLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of EventLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationCountArgs} args - Arguments to filter EventLocations to count.
     * @example
     * // Count the number of EventLocations
     * const count = await prisma.eventLocation.count({
     *   where: {
     *     // ... the filter for the EventLocations we want to count
     *   }
     * })
    **/
    count<T extends EventLocationCountArgs>(
      args?: Subset<T, EventLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventLocationAggregateArgs>(args: Subset<T, EventLocationAggregateArgs>): Prisma.PrismaPromise<GetEventLocationAggregateType<T>>

    /**
     * Group by EventLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventLocationGroupByArgs['orderBy'] }
        : { orderBy?: EventLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventLocation model
   */
  readonly fields: EventLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventLocation model
   */
  interface EventLocationFieldRefs {
    readonly id: FieldRef<"EventLocation", 'String'>
    readonly streetAddress: FieldRef<"EventLocation", 'String'>
    readonly eventId: FieldRef<"EventLocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EventLocation findUnique
   */
  export type EventLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter, which EventLocation to fetch.
     */
    where: EventLocationWhereUniqueInput
  }

  /**
   * EventLocation findUniqueOrThrow
   */
  export type EventLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter, which EventLocation to fetch.
     */
    where: EventLocationWhereUniqueInput
  }

  /**
   * EventLocation findFirst
   */
  export type EventLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter, which EventLocation to fetch.
     */
    where?: EventLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLocations to fetch.
     */
    orderBy?: EventLocationOrderByWithRelationInput | EventLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLocations.
     */
    cursor?: EventLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLocations.
     */
    distinct?: EventLocationScalarFieldEnum | EventLocationScalarFieldEnum[]
  }

  /**
   * EventLocation findFirstOrThrow
   */
  export type EventLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter, which EventLocation to fetch.
     */
    where?: EventLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLocations to fetch.
     */
    orderBy?: EventLocationOrderByWithRelationInput | EventLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLocations.
     */
    cursor?: EventLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLocations.
     */
    distinct?: EventLocationScalarFieldEnum | EventLocationScalarFieldEnum[]
  }

  /**
   * EventLocation findMany
   */
  export type EventLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter, which EventLocations to fetch.
     */
    where?: EventLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLocations to fetch.
     */
    orderBy?: EventLocationOrderByWithRelationInput | EventLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventLocations.
     */
    cursor?: EventLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLocations.
     */
    skip?: number
    distinct?: EventLocationScalarFieldEnum | EventLocationScalarFieldEnum[]
  }

  /**
   * EventLocation update
   */
  export type EventLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a EventLocation.
     */
    data: XOR<EventLocationUpdateInput, EventLocationUncheckedUpdateInput>
    /**
     * Choose, which EventLocation to update.
     */
    where: EventLocationWhereUniqueInput
  }

  /**
   * EventLocation updateMany
   */
  export type EventLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventLocations.
     */
    data: XOR<EventLocationUpdateManyMutationInput, EventLocationUncheckedUpdateManyInput>
    /**
     * Filter which EventLocations to update
     */
    where?: EventLocationWhereInput
    /**
     * Limit how many EventLocations to update.
     */
    limit?: number
  }

  /**
   * EventLocation updateManyAndReturn
   */
  export type EventLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * The data used to update EventLocations.
     */
    data: XOR<EventLocationUpdateManyMutationInput, EventLocationUncheckedUpdateManyInput>
    /**
     * Filter which EventLocations to update
     */
    where?: EventLocationWhereInput
    /**
     * Limit how many EventLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventLocation delete
   */
  export type EventLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
    /**
     * Filter which EventLocation to delete.
     */
    where: EventLocationWhereUniqueInput
  }

  /**
   * EventLocation deleteMany
   */
  export type EventLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLocations to delete
     */
    where?: EventLocationWhereInput
    /**
     * Limit how many EventLocations to delete.
     */
    limit?: number
  }

  /**
   * EventLocation without action
   */
  export type EventLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLocation
     */
    select?: EventLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLocation
     */
    omit?: EventLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    preferences: 'preferences'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserLocationScalarFieldEnum: {
    id: 'id',
    streetAddress: 'streetAddress',
    userId: 'userId'
  };

  export type UserLocationScalarFieldEnum = (typeof UserLocationScalarFieldEnum)[keyof typeof UserLocationScalarFieldEnum]


  export const UserPolyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    activeFlag: 'activeFlag'
  };

  export type UserPolyScalarFieldEnum = (typeof UserPolyScalarFieldEnum)[keyof typeof UserPolyScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    images: 'images',
    textDescription: 'textDescription'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventLocationScalarFieldEnum: {
    id: 'id',
    streetAddress: 'streetAddress',
    eventId: 'eventId'
  };

  export type EventLocationScalarFieldEnum = (typeof EventLocationScalarFieldEnum)[keyof typeof EventLocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    preferences?: StringFilter<"User"> | string
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
    events?: EventListRelationFilter
    likedEvents?: EventListRelationFilter
    polygons?: UserPolyListRelationFilter
    geoLocation?: XOR<UserLocationNullableScalarRelationFilter, UserLocationWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    preferences?: SortOrder
    friends?: UserOrderByRelationAggregateInput
    friendOf?: UserOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    likedEvents?: EventOrderByRelationAggregateInput
    polygons?: UserPolyOrderByRelationAggregateInput
    geoLocation?: UserLocationOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    preferences?: StringFilter<"User"> | string
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
    events?: EventListRelationFilter
    likedEvents?: EventListRelationFilter
    polygons?: UserPolyListRelationFilter
    geoLocation?: XOR<UserLocationNullableScalarRelationFilter, UserLocationWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    preferences?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferences?: StringWithAggregatesFilter<"User"> | string
  }

  export type UserLocationWhereInput = {
    AND?: UserLocationWhereInput | UserLocationWhereInput[]
    OR?: UserLocationWhereInput[]
    NOT?: UserLocationWhereInput | UserLocationWhereInput[]
    id?: UuidFilter<"UserLocation"> | string
    streetAddress?: StringFilter<"UserLocation"> | string
    userId?: UuidFilter<"UserLocation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserLocationOrderByWithRelationInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserLocationWhereInput | UserLocationWhereInput[]
    OR?: UserLocationWhereInput[]
    NOT?: UserLocationWhereInput | UserLocationWhereInput[]
    streetAddress?: StringFilter<"UserLocation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserLocationOrderByWithAggregationInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    userId?: SortOrder
    _count?: UserLocationCountOrderByAggregateInput
    _max?: UserLocationMaxOrderByAggregateInput
    _min?: UserLocationMinOrderByAggregateInput
  }

  export type UserLocationScalarWhereWithAggregatesInput = {
    AND?: UserLocationScalarWhereWithAggregatesInput | UserLocationScalarWhereWithAggregatesInput[]
    OR?: UserLocationScalarWhereWithAggregatesInput[]
    NOT?: UserLocationScalarWhereWithAggregatesInput | UserLocationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserLocation"> | string
    streetAddress?: StringWithAggregatesFilter<"UserLocation"> | string
    userId?: UuidWithAggregatesFilter<"UserLocation"> | string
  }

  export type UserPolyWhereInput = {
    AND?: UserPolyWhereInput | UserPolyWhereInput[]
    OR?: UserPolyWhereInput[]
    NOT?: UserPolyWhereInput | UserPolyWhereInput[]
    id?: UuidFilter<"UserPoly"> | string
    userId?: UuidFilter<"UserPoly"> | string
    activeFlag?: StringFilter<"UserPoly"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserPolyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    activeFlag?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserPolyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserPolyWhereInput | UserPolyWhereInput[]
    OR?: UserPolyWhereInput[]
    NOT?: UserPolyWhereInput | UserPolyWhereInput[]
    activeFlag?: StringFilter<"UserPoly"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserPolyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    activeFlag?: SortOrder
    _count?: UserPolyCountOrderByAggregateInput
    _max?: UserPolyMaxOrderByAggregateInput
    _min?: UserPolyMinOrderByAggregateInput
  }

  export type UserPolyScalarWhereWithAggregatesInput = {
    AND?: UserPolyScalarWhereWithAggregatesInput | UserPolyScalarWhereWithAggregatesInput[]
    OR?: UserPolyScalarWhereWithAggregatesInput[]
    NOT?: UserPolyScalarWhereWithAggregatesInput | UserPolyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserPoly"> | string
    userId?: UuidWithAggregatesFilter<"UserPoly"> | string
    activeFlag?: StringWithAggregatesFilter<"UserPoly"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: UuidFilter<"Event"> | string
    userId?: UuidFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    images?: StringNullableListFilter<"Event">
    textDescription?: StringFilter<"Event"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: UserListRelationFilter
    geoLocation?: XOR<EventLocationNullableScalarRelationFilter, EventLocationWhereInput> | null
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    images?: SortOrder
    textDescription?: SortOrder
    user?: UserOrderByWithRelationInput
    likes?: UserOrderByRelationAggregateInput
    geoLocation?: EventLocationOrderByWithRelationInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    images?: StringNullableListFilter<"Event">
    textDescription?: StringFilter<"Event"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: UserListRelationFilter
    geoLocation?: XOR<EventLocationNullableScalarRelationFilter, EventLocationWhereInput> | null
  }, "id" | "userId">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    images?: SortOrder
    textDescription?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Event"> | string
    userId?: UuidWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    images?: StringNullableListFilter<"Event">
    textDescription?: StringWithAggregatesFilter<"Event"> | string
  }

  export type EventLocationWhereInput = {
    AND?: EventLocationWhereInput | EventLocationWhereInput[]
    OR?: EventLocationWhereInput[]
    NOT?: EventLocationWhereInput | EventLocationWhereInput[]
    id?: UuidFilter<"EventLocation"> | string
    streetAddress?: StringFilter<"EventLocation"> | string
    eventId?: UuidFilter<"EventLocation"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type EventLocationOrderByWithRelationInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type EventLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId?: string
    AND?: EventLocationWhereInput | EventLocationWhereInput[]
    OR?: EventLocationWhereInput[]
    NOT?: EventLocationWhereInput | EventLocationWhereInput[]
    streetAddress?: StringFilter<"EventLocation"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id" | "eventId">

  export type EventLocationOrderByWithAggregationInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    eventId?: SortOrder
    _count?: EventLocationCountOrderByAggregateInput
    _max?: EventLocationMaxOrderByAggregateInput
    _min?: EventLocationMinOrderByAggregateInput
  }

  export type EventLocationScalarWhereWithAggregatesInput = {
    AND?: EventLocationScalarWhereWithAggregatesInput | EventLocationScalarWhereWithAggregatesInput[]
    OR?: EventLocationScalarWhereWithAggregatesInput[]
    NOT?: EventLocationScalarWhereWithAggregatesInput | EventLocationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EventLocation"> | string
    streetAddress?: StringWithAggregatesFilter<"EventLocation"> | string
    eventId?: UuidWithAggregatesFilter<"EventLocation"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    events?: EventCreateNestedManyWithoutUserInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
  }

  export type UserLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutGeoLocationNestedInput
  }

  export type UserLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPolygonsNestedInput
  }

  export type UserPolyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    user: UserCreateNestedOneWithoutEventsInput
    likes?: UserCreateNestedManyWithoutLikedEventsInput
    geoLocation?: EventLocationCreateNestedOneWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    likes?: UserUncheckedCreateNestedManyWithoutLikedEventsInput
    geoLocation?: EventLocationUncheckedCreateNestedOneWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    likes?: UserUpdateManyWithoutLikedEventsNestedInput
    geoLocation?: EventLocationUpdateOneWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    likes?: UserUncheckedUpdateManyWithoutLikedEventsNestedInput
    geoLocation?: EventLocationUncheckedUpdateOneWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    userId: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
  }

  export type EventLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    event?: EventUpdateOneRequiredWithoutGeoLocationNestedInput
  }

  export type EventLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type EventLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type EventLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type UserPolyListRelationFilter = {
    every?: UserPolyWhereInput
    some?: UserPolyWhereInput
    none?: UserPolyWhereInput
  }

  export type UserLocationNullableScalarRelationFilter = {
    is?: UserLocationWhereInput | null
    isNot?: UserLocationWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserPolyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    preferences?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    preferences?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    preferences?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserLocationCountOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    userId?: SortOrder
  }

  export type UserLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    userId?: SortOrder
  }

  export type UserLocationMinOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    userId?: SortOrder
  }

  export type UserPolyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activeFlag?: SortOrder
  }

  export type UserPolyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activeFlag?: SortOrder
  }

  export type UserPolyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activeFlag?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EventLocationNullableScalarRelationFilter = {
    is?: EventLocationWhereInput | null
    isNot?: EventLocationWhereInput | null
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    images?: SortOrder
    textDescription?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    textDescription?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    textDescription?: SortOrder
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventLocationCountOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    eventId?: SortOrder
  }

  export type EventLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    eventId?: SortOrder
  }

  export type EventLocationMinOrderByAggregateInput = {
    id?: SortOrder
    streetAddress?: SortOrder
    eventId?: SortOrder
  }

  export type UserCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutLikesInput = {
    create?: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput> | EventCreateWithoutLikesInput[] | EventUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutLikesInput | EventCreateOrConnectWithoutLikesInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserPolyCreateNestedManyWithoutUserInput = {
    connect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
  }

  export type UserLocationCreateNestedOneWithoutUserInput = {
    connect?: UserLocationWhereUniqueInput
  }

  export type UserUncheckedCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutLikesInput = {
    create?: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput> | EventCreateWithoutLikesInput[] | EventUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutLikesInput | EventCreateOrConnectWithoutLikesInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserPolyUncheckedCreateNestedManyWithoutUserInput = {
    connect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
  }

  export type UserLocationUncheckedCreateNestedOneWithoutUserInput = {
    connect?: UserLocationWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventUpdateManyWithoutLikesNestedInput = {
    create?: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput> | EventCreateWithoutLikesInput[] | EventUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutLikesInput | EventCreateOrConnectWithoutLikesInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutLikesInput | EventUpsertWithWhereUniqueWithoutLikesInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutLikesInput | EventUpdateWithWhereUniqueWithoutLikesInput[]
    updateMany?: EventUpdateManyWithWhereWithoutLikesInput | EventUpdateManyWithWhereWithoutLikesInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserPolyUpdateManyWithoutUserNestedInput = {
    set?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    disconnect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    delete?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    connect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    update?: UserPolyUpdateWithWhereUniqueWithoutUserInput | UserPolyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPolyUpdateManyWithWhereWithoutUserInput | UserPolyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPolyScalarWhereInput | UserPolyScalarWhereInput[]
  }

  export type UserLocationUpdateOneWithoutUserNestedInput = {
    disconnect?: UserLocationWhereInput | boolean
    delete?: UserLocationWhereInput | boolean
    connect?: UserLocationWhereUniqueInput
    update?: XOR<XOR<UserLocationUpdateToOneWithWhereWithoutUserInput, UserLocationUpdateWithoutUserInput>, UserLocationUncheckedUpdateWithoutUserInput>
  }

  export type UserUncheckedUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutLikesNestedInput = {
    create?: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput> | EventCreateWithoutLikesInput[] | EventUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutLikesInput | EventCreateOrConnectWithoutLikesInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutLikesInput | EventUpsertWithWhereUniqueWithoutLikesInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutLikesInput | EventUpdateWithWhereUniqueWithoutLikesInput[]
    updateMany?: EventUpdateManyWithWhereWithoutLikesInput | EventUpdateManyWithWhereWithoutLikesInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserPolyUncheckedUpdateManyWithoutUserNestedInput = {
    set?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    disconnect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    delete?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    connect?: UserPolyWhereUniqueInput | UserPolyWhereUniqueInput[]
    update?: UserPolyUpdateWithWhereUniqueWithoutUserInput | UserPolyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPolyUpdateManyWithWhereWithoutUserInput | UserPolyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPolyScalarWhereInput | UserPolyScalarWhereInput[]
  }

  export type UserLocationUncheckedUpdateOneWithoutUserNestedInput = {
    disconnect?: UserLocationWhereInput | boolean
    delete?: UserLocationWhereInput | boolean
    connect?: UserLocationWhereUniqueInput
    update?: XOR<XOR<UserLocationUpdateToOneWithWhereWithoutUserInput, UserLocationUpdateWithoutUserInput>, UserLocationUncheckedUpdateWithoutUserInput>
  }

  export type UserUpdateOneRequiredWithoutGeoLocationNestedInput = {
    create?: XOR<UserCreateWithoutGeoLocationInput, UserUncheckedCreateWithoutGeoLocationInput>
    connectOrCreate?: UserCreateOrConnectWithoutGeoLocationInput
    upsert?: UserUpsertWithoutGeoLocationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGeoLocationInput, UserUpdateWithoutGeoLocationInput>, UserUncheckedUpdateWithoutGeoLocationInput>
  }

  export type UserUpdateOneRequiredWithoutPolygonsNestedInput = {
    create?: XOR<UserCreateWithoutPolygonsInput, UserUncheckedCreateWithoutPolygonsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPolygonsInput
    upsert?: UserUpsertWithoutPolygonsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPolygonsInput, UserUpdateWithoutPolygonsInput>, UserUncheckedUpdateWithoutPolygonsInput>
  }

  export type EventCreateimagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutLikedEventsInput = {
    create?: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput> | UserCreateWithoutLikedEventsInput[] | UserUncheckedCreateWithoutLikedEventsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedEventsInput | UserCreateOrConnectWithoutLikedEventsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EventLocationCreateNestedOneWithoutEventInput = {
    connect?: EventLocationWhereUniqueInput
  }

  export type UserUncheckedCreateNestedManyWithoutLikedEventsInput = {
    create?: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput> | UserCreateWithoutLikedEventsInput[] | UserUncheckedCreateWithoutLikedEventsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedEventsInput | UserCreateOrConnectWithoutLikedEventsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EventLocationUncheckedCreateNestedOneWithoutEventInput = {
    connect?: EventLocationWhereUniqueInput
  }

  export type EventUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateManyWithoutLikedEventsNestedInput = {
    create?: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput> | UserCreateWithoutLikedEventsInput[] | UserUncheckedCreateWithoutLikedEventsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedEventsInput | UserCreateOrConnectWithoutLikedEventsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLikedEventsInput | UserUpsertWithWhereUniqueWithoutLikedEventsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLikedEventsInput | UserUpdateWithWhereUniqueWithoutLikedEventsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLikedEventsInput | UserUpdateManyWithWhereWithoutLikedEventsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EventLocationUpdateOneWithoutEventNestedInput = {
    disconnect?: EventLocationWhereInput | boolean
    delete?: EventLocationWhereInput | boolean
    connect?: EventLocationWhereUniqueInput
    update?: XOR<XOR<EventLocationUpdateToOneWithWhereWithoutEventInput, EventLocationUpdateWithoutEventInput>, EventLocationUncheckedUpdateWithoutEventInput>
  }

  export type UserUncheckedUpdateManyWithoutLikedEventsNestedInput = {
    create?: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput> | UserCreateWithoutLikedEventsInput[] | UserUncheckedCreateWithoutLikedEventsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedEventsInput | UserCreateOrConnectWithoutLikedEventsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLikedEventsInput | UserUpsertWithWhereUniqueWithoutLikedEventsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLikedEventsInput | UserUpdateWithWhereUniqueWithoutLikedEventsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLikedEventsInput | UserUpdateManyWithWhereWithoutLikedEventsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EventLocationUncheckedUpdateOneWithoutEventNestedInput = {
    disconnect?: EventLocationWhereInput | boolean
    delete?: EventLocationWhereInput | boolean
    connect?: EventLocationWhereUniqueInput
    update?: XOR<XOR<EventLocationUpdateToOneWithWhereWithoutEventInput, EventLocationUpdateWithoutEventInput>, EventLocationUncheckedUpdateWithoutEventInput>
  }

  export type EventUpdateOneRequiredWithoutGeoLocationNestedInput = {
    create?: XOR<EventCreateWithoutGeoLocationInput, EventUncheckedCreateWithoutGeoLocationInput>
    connectOrCreate?: EventCreateOrConnectWithoutGeoLocationInput
    upsert?: EventUpsertWithoutGeoLocationInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutGeoLocationInput, EventUpdateWithoutGeoLocationInput>, EventUncheckedUpdateWithoutGeoLocationInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserCreateWithoutFriendOfInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    events?: EventCreateNestedManyWithoutUserInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendOfInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserCreateWithoutFriendsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    events?: EventCreateNestedManyWithoutUserInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type EventCreateWithoutUserInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    likes?: UserCreateNestedManyWithoutLikedEventsInput
    geoLocation?: EventLocationCreateNestedOneWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    likes?: UserUncheckedCreateNestedManyWithoutLikedEventsInput
    geoLocation?: EventLocationUncheckedCreateNestedOneWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutLikesInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    user: UserCreateNestedOneWithoutEventsInput
    geoLocation?: EventLocationCreateNestedOneWithoutEventInput
  }

  export type EventUncheckedCreateWithoutLikesInput = {
    id?: string
    userId: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    geoLocation?: EventLocationUncheckedCreateNestedOneWithoutEventInput
  }

  export type EventCreateOrConnectWithoutLikesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput>
  }

  export type UserUpsertWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendOfInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendOfInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: UuidFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    preferences?: StringFilter<"User"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendsInput>
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: UuidFilter<"Event"> | string
    userId?: UuidFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    images?: StringNullableListFilter<"Event">
    textDescription?: StringFilter<"Event"> | string
  }

  export type EventUpsertWithWhereUniqueWithoutLikesInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutLikesInput, EventUncheckedUpdateWithoutLikesInput>
    create: XOR<EventCreateWithoutLikesInput, EventUncheckedCreateWithoutLikesInput>
  }

  export type EventUpdateWithWhereUniqueWithoutLikesInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutLikesInput, EventUncheckedUpdateWithoutLikesInput>
  }

  export type EventUpdateManyWithWhereWithoutLikesInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutLikesInput>
  }

  export type UserPolyUpdateWithWhereUniqueWithoutUserInput = {
    where: UserPolyWhereUniqueInput
    data: XOR<UserPolyUpdateWithoutUserInput, UserPolyUncheckedUpdateWithoutUserInput>
  }

  export type UserPolyUpdateManyWithWhereWithoutUserInput = {
    where: UserPolyScalarWhereInput
    data: XOR<UserPolyUpdateManyMutationInput, UserPolyUncheckedUpdateManyWithoutUserInput>
  }

  export type UserPolyScalarWhereInput = {
    AND?: UserPolyScalarWhereInput | UserPolyScalarWhereInput[]
    OR?: UserPolyScalarWhereInput[]
    NOT?: UserPolyScalarWhereInput | UserPolyScalarWhereInput[]
    id?: UuidFilter<"UserPoly"> | string
    userId?: UuidFilter<"UserPoly"> | string
    activeFlag?: StringFilter<"UserPoly"> | string
  }

  export type UserLocationUpdateToOneWithWhereWithoutUserInput = {
    where?: UserLocationWhereInput
    data: XOR<UserLocationUpdateWithoutUserInput, UserLocationUncheckedUpdateWithoutUserInput>
  }

  export type UserLocationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserLocationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutGeoLocationInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    events?: EventCreateNestedManyWithoutUserInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGeoLocationInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGeoLocationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGeoLocationInput, UserUncheckedCreateWithoutGeoLocationInput>
  }

  export type UserUpsertWithoutGeoLocationInput = {
    update: XOR<UserUpdateWithoutGeoLocationInput, UserUncheckedUpdateWithoutGeoLocationInput>
    create: XOR<UserCreateWithoutGeoLocationInput, UserUncheckedCreateWithoutGeoLocationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGeoLocationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGeoLocationInput, UserUncheckedUpdateWithoutGeoLocationInput>
  }

  export type UserUpdateWithoutGeoLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGeoLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPolygonsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    events?: EventCreateNestedManyWithoutUserInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPolygonsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPolygonsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPolygonsInput, UserUncheckedCreateWithoutPolygonsInput>
  }

  export type UserUpsertWithoutPolygonsInput = {
    update: XOR<UserUpdateWithoutPolygonsInput, UserUncheckedUpdateWithoutPolygonsInput>
    create: XOR<UserCreateWithoutPolygonsInput, UserUncheckedCreateWithoutPolygonsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPolygonsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPolygonsInput, UserUncheckedUpdateWithoutPolygonsInput>
  }

  export type UserUpdateWithoutPolygonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPolygonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    likedEvents?: EventCreateNestedManyWithoutLikesInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    likedEvents?: EventUncheckedCreateNestedManyWithoutLikesInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type UserCreateWithoutLikedEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    events?: EventCreateNestedManyWithoutUserInput
    polygons?: UserPolyCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    preferences: string
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    polygons?: UserPolyUncheckedCreateNestedManyWithoutUserInput
    geoLocation?: UserLocationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput>
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutLikedEventsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLikedEventsInput, UserUncheckedUpdateWithoutLikedEventsInput>
    create: XOR<UserCreateWithoutLikedEventsInput, UserUncheckedCreateWithoutLikedEventsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLikedEventsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLikedEventsInput, UserUncheckedUpdateWithoutLikedEventsInput>
  }

  export type UserUpdateManyWithWhereWithoutLikedEventsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutLikedEventsInput>
  }

  export type EventLocationUpdateToOneWithWhereWithoutEventInput = {
    where?: EventLocationWhereInput
    data: XOR<EventLocationUpdateWithoutEventInput, EventLocationUncheckedUpdateWithoutEventInput>
  }

  export type EventLocationUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type EventLocationUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateWithoutGeoLocationInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    user: UserCreateNestedOneWithoutEventsInput
    likes?: UserCreateNestedManyWithoutLikedEventsInput
  }

  export type EventUncheckedCreateWithoutGeoLocationInput = {
    id?: string
    userId: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
    likes?: UserUncheckedCreateNestedManyWithoutLikedEventsInput
  }

  export type EventCreateOrConnectWithoutGeoLocationInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutGeoLocationInput, EventUncheckedCreateWithoutGeoLocationInput>
  }

  export type EventUpsertWithoutGeoLocationInput = {
    update: XOR<EventUpdateWithoutGeoLocationInput, EventUncheckedUpdateWithoutGeoLocationInput>
    create: XOR<EventCreateWithoutGeoLocationInput, EventUncheckedCreateWithoutGeoLocationInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutGeoLocationInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutGeoLocationInput, EventUncheckedUpdateWithoutGeoLocationInput>
  }

  export type EventUpdateWithoutGeoLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    likes?: UserUpdateManyWithoutLikedEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutGeoLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    likes?: UserUncheckedUpdateManyWithoutLikedEventsNestedInput
  }

  export type EventCreateManyUserInput = {
    id?: string
    title: string
    images?: EventCreateimagesInput | string[]
    textDescription: string
  }

  export type UserUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    likedEvents?: EventUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    likedEvents?: EventUncheckedUpdateManyWithoutLikesNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
  }

  export type EventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    likes?: UserUpdateManyWithoutLikedEventsNestedInput
    geoLocation?: EventLocationUpdateOneWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    likes?: UserUncheckedUpdateManyWithoutLikedEventsNestedInput
    geoLocation?: EventLocationUncheckedUpdateOneWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
  }

  export type EventUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    geoLocation?: EventLocationUpdateOneWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
    geoLocation?: EventLocationUncheckedUpdateOneWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    images?: EventUpdateimagesInput | string[]
    textDescription?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type UserPolyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeFlag?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutLikedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    polygons?: UserPolyUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    polygons?: UserPolyUncheckedUpdateManyWithoutUserNestedInput
    geoLocation?: UserLocationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutLikedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}