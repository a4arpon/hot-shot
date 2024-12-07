// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class IoC_Container {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private static instances = new Map<string, any>()

  public static register<T>(name: string, instance: T): void {
    IoC_Container.instances.set(name, instance)
  }

  public static resolve<T>(ClassRef: new () => T): T {
    const className = ClassRef.name

    if (!IoC_Container.instances.has(className)) {
      IoC_Container.register(className, new ClassRef())
    }

    const instance = IoC_Container.instances.get(className)

    if (!instance) {
      throw new Error(`Instance "${className}" not found in IoC Container`)
    }

    return instance
  }
}