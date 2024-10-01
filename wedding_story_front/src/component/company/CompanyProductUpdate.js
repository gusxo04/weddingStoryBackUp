const CompanyProductUpdate = () => {
  return (
    <div className="companyProduct-main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insertProduct();
        }}
      >
        <CompanyProductFrm
          product={product}
          setProduct={setProduct}
          productContent={productContent}
          setProductContent={setProductContent}
          companyCategory={companyCategory}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProductUpdate;
