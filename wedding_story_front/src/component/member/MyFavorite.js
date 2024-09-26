const MyFavorite = (props) => {
  const setNowPath = props.setNowPath;
  setNowPath("favorite");
  return (
    <div>
      <p>관심상품</p>
    </div>
  );
};
export default MyFavorite;
