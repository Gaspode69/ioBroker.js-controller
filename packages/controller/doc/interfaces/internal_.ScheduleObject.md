[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ScheduleObject

# Interface: ScheduleObject

[\<internal\>](../modules/internal_.md).ScheduleObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`ScheduleObject`**

## Table of contents

### Properties

- [\_id](internal_.ScheduleObject.md#_id)
- [acl](internal_.ScheduleObject.md#acl)
- [common](internal_.ScheduleObject.md#common)
- [enums](internal_.ScheduleObject.md#enums)
- [from](internal_.ScheduleObject.md#from)
- [native](internal_.ScheduleObject.md#native)
- [nonEdit](internal_.ScheduleObject.md#nonedit)
- [ts](internal_.ScheduleObject.md#ts)
- [type](internal_.ScheduleObject.md#type)
- [user](internal_.ScheduleObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L858)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L865)

___

### common

• **common**: [`ScheduleCommon`](internal_.ScheduleCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:940](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L940)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L864)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L866)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L862)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L871)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:869](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L869)

___

### type

• **type**: ``"schedule"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:939](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L939)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L868)
