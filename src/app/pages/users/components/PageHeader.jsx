/* eslint-disable jsx-a11y/anchor-is-valid */

const PageHeader = (props: {title: string}) => {
  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        <div className='d-flex align-items-center'>
          <button className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'>
            <span>
              <i className='fas fa-search'></i>
              <span className=''>Tìm kiếm</span>
            </span>
          </button>
          <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => {}}>
            <span>
              <i className='fas fa-plus'></i>
              <span className=''>Thêm mới</span>
            </span>
          </button>

          {/*          <div>
              <p>
                <a
                  className='btn btn-primary'
                  data-bs-toggle='collapse'
                  href='#collapseExample'
                  role='button'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                >
                  Link with href
                </a>
                <button
                  className='btn btn-primary'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseExample'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                >
                  Button with data-bs-target
                </button>
              </p>
              <div className='collapse' id='collapseExample'>
                <div className='card card-body'>
                  Some placeholder content for the collapse component. This panel is hidden by
                  default but revealed when the user activates the relevant trigger.
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
