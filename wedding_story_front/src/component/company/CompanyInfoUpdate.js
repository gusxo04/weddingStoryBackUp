const CompanyInfoUpdate = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insertCompany();
        }}
      >
        <CompanyJoinFrm
          company={company}
          setCompany={setCompany}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfoUpdate;
