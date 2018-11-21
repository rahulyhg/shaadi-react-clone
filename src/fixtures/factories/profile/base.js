const detailList = [
  { key: 'age-height', value: "24, 5'7" },
  { key: 'religion-community', value: 'Hindu, Punjabi' },
  { key: 'profession', value: 'Teacher' },
  { key: 'location', value: 'Delhi, India' },
];

export default function base(props = {}) {
  return {
    detailList: props.detailList || detailList,
    cardInfo: props.cardInfo || detailList,
    ...props,
  };
}
