# Item


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**article** | **string** |  | [default to undefined]
**images** | [**Array&lt;Image&gt;**](Image.md) |  | [default to undefined]
**price** | **number** |  | [default to undefined]
**category** | **number** |  | [optional] [default to undefined]
**properties** | [**Array&lt;PropertyQuantity&gt;**](PropertyQuantity.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Item } from './api';

const instance: Item = {
    id,
    name,
    description,
    article,
    images,
    price,
    category,
    properties,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
