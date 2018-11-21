export default function summary(props = {}) {
  return {
    summary: props.summary || {},
    listAlbum: props.listAlbum || [],
    ...props,
  };
}
