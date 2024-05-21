// father-son 是老的，新的叫many-one
const SINGLE_SELECT_FORMATS = [
  'many-one',
  /**
   * A 建立 1对1 到B
   * 从A看 就是one-one
   * 从B看 就是one-one-r
   */
  'one-one',
  'one-one-r',
];

const MULTI_SELECT_FORMATS = ['many-many', 'one-many'];

export function convertRemoteValueToFormData(
  dataSourceType,
  dataSourceProfile,
  fetchedInitialValues
) {
  if (dataSourceType === 'experssion') {
    return fetchedInitialValues;
  }
  const result = Object.keys(fetchedInitialValues).reduce((acc, field) => {
    const format = dataSourceProfile?.schema?.properties?.[field]?.format;
    acc[field] = fetchedInitialValues[field];
    if (
      [...SINGLE_SELECT_FORMATS, 'father-son'].includes(format) &&
      fetchedInitialValues[field]['_id']
    ) {
      acc[field] = fetchedInitialValues[field]['_id'];
    }
    if (MULTI_SELECT_FORMATS.includes(format)) {
      acc[field] = fetchedInitialValues[field].map((item) => item['_id']);
    }
    return acc;
  }, {});
  return result;
}

export function convertFormDataToSubmitParams(
  dataSourceProfile,
  formData,
  formType,
  _id,
  fields
) {
  const data = Object.keys(formData).reduce((acc, cur) => {
    if (!fields.includes(cur)) return acc;
    const format = dataSourceProfile.schema?.properties?.[cur]?.format;
    acc[cur] = formData[cur];
    if (SINGLE_SELECT_FORMATS.includes(format)) {
      acc[cur] = { _id: formData[cur] };
    }
    if (MULTI_SELECT_FORMATS.includes(format)) {
      acc[cur] = acc[cur]?.map((_id) => ({ _id }));
    }
    return acc;
  }, {});
  const result = {
    data,
  };
  if (formType !== 'create' && _id) {
    const where = {
      $and: [
        {
          _id: {
            $eq: _id,
          },
        },
      ],
    };
    result['filter'] = { where };
  }

  return result;
}
