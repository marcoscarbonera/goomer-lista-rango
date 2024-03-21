import { DeepPartial } from 'typeorm';

/**
 * Mapeador de modelo.
 *
 * @typeparam Model O tipo do modelo.
 * @typeparam Entity O tipo da entidade.
 */
export interface ModelMapper<
  Model extends Record<string, any>,
  Entity extends Record<string, any>,
> {
  /**
   * Converte uma entidade em um modelo.
   *
   * @param entity A entidade a ser convertida.
   * @returns O modelo resultante.
   */
  domainToModel: (entity: Entity) => DeepPartial<Model>;

  /**
   * Converte um modelo em uma entidade.
   *
   * @param model O modelo a ser convertido.
   * @param entityType (Opcional) O tipo da entidade para o qual o modelo será convertido.
   * @returns A entidade resultante.
   */
  modelToDomain: <T extends Entity>(
    model: DeepPartial<Model> & Model,
    entityType?: new () => T,
  ) => T;
}

/**
 * Cria um mapeador de modelo.
 *
 * @typeparam Model O tipo do modelo.
 * @typeparam Entity O tipo da entidade.
 * @returns Um objeto que contém as funções de conversão de modelo.
 */
export function createModelMapper<
  Model extends Record<string, any>,
  Entity extends Record<string, any>,
>(): ModelMapper<Model, Entity> {
  return {
    domainToModel: (entity: Entity) => {
      // Retorna a entidade diretamente como um modelo
      return entity as DeepPartial<Model>;
    },
    modelToDomain: <T extends Entity>(
      model: DeepPartial<Model> & Model,
      entityType?: new () => T,
    ) => {
      const result: Partial<T> = {};

      // Se o entityType for fornecido, cria uma instância dele
      const entityInstance = entityType ? new entityType() : null;

      // Se o entityType for fornecido, obtém as chaves da entidade
      const entityKeys = entityInstance
        ? (Object.keys(entityInstance) as (keyof T)[])
        : [];

      // TODO: Preciso ajustar, para remover campos da model, nao usados na entidade.
      for (const key in model) {
        if (
          model.hasOwnProperty(key) &&
          (!entityInstance || entityKeys.includes(key as keyof T))
        ) {
          result[key as keyof T] = model[key];
        }
      }
      return result as T;
    },
  };
}
