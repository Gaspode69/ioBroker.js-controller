[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialScheduleObject

# Interface: PartialScheduleObject

[\<internal\>](../modules/internal_.md).PartialScheduleObject

## Hierarchy

- `Partial`\<`Omit`\<[`ScheduleObject`](internal_.ScheduleObject.md), ``"common"``\>\>

  ↳ **`PartialScheduleObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialScheduleObject.md#_id)
- [acl](internal_.PartialScheduleObject.md#acl)
- [common](internal_.PartialScheduleObject.md#common)
- [enums](internal_.PartialScheduleObject.md#enums)
- [from](internal_.PartialScheduleObject.md#from)
- [native](internal_.PartialScheduleObject.md#native)
- [nonEdit](internal_.PartialScheduleObject.md#nonedit)
- [ts](internal_.PartialScheduleObject.md#ts)
- [type](internal_.PartialScheduleObject.md#type)
- [user](internal_.PartialScheduleObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L858)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L865)

___

### common

• `Optional` **common**: `Partial`\<[`ScheduleCommon`](internal_.ScheduleCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:944](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L944)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L864)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L866)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L862)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L871)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:869](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L869)

___

### type

• `Optional` **type**: ``"schedule"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:939](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L939)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L868)
