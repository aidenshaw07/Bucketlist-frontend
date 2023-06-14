import { useFetchBucketList } from "../app/hooks/useFetchBucketList";

export const BucketListItems = () => {
  const {
    createBucketListItem,
    renderBucketListItems,
    handleDescriptionChange,
    handleTitleChange,
    title,
    description,
  } = useFetchBucketList();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBucketListItem();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit">Create Bucket List</button>
      </form>
      <h2>Bucket List Items:</h2>
      {renderBucketListItems}
    </div>
  );
};
