/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {useIntl} from 'react-intl';
import {KTSVG} from '../../../helpers';
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub';
import {AsideMenuItem} from './AsideMenuItem';

export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      /> */}
      {/* <AsideMenuItem to='/builder' icon='/media/icons/duotune/general/gen019.svg' title='Layout Builder' fontIcon='bi-layers' /> */}

      <AsideMenuItemWithSub to='/general' title='Danh mục chung' icon='/media/icons/duotune/communication/com006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/general/categories' title='Lĩnh vực' hasBullet={true} />
        <AsideMenuItem to='/general/areas' title='Địa bàn' hasBullet={true} />
        <AsideMenuItem to='/general/placetypes' title='Loại địa điểm' hasBullet={true} />
        <AsideMenuItem to='/general/places' title='Địa điểm' hasBullet={true} />
        <AsideMenuItem to='/general/homepageinfors' title='Ảnh trang chủ' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/traffic' title='Giao thông' icon='/media/icons/duotune/ecommerce/ecm006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/traffic/carpolicies' title='Chính sách đi xe' hasBullet={true} />
        <AsideMenuItem to='/traffic/carutilities' title='Tiện ích xe' hasBullet={true} />
        <AsideMenuItem to='/traffic/vehicletypes' title='Loại phương tiện' hasBullet={true} />
        <AsideMenuItem to='/traffic/carpools' title='Đi chung xe' hasBullet={true} />
        <AsideMenuItem to='/traffic/vehicles' title='Dịch vụ xe khách' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/business' title='Tuyển dụng' icon='/media/icons/duotune/finance/fin006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/business/benefits' title='Phúc lợi công ty' hasBullet={true} />
        <AsideMenuItem to='/business/degrees' title='Loại bằng cấp' hasBullet={true} />
        <AsideMenuItem to='/business/experiences' title='Kinh nghiệm làm việc' hasBullet={true} />
        <AsideMenuItem to='/business/industries' title='Ngành nghề kinh doanh' hasBullet={true} />
        <AsideMenuItem to='/business/jobages' title='Độ tuổi' hasBullet={true} />
        <AsideMenuItem to='/business/jobnames' title='Nghề nghiệp' hasBullet={true} />
        <AsideMenuItem to='/business/jobpositions' title='Vị trí tuyển dụng' hasBullet={true} />
        <AsideMenuItem to='/business/jobtypes' title='Loại hình công việc' hasBullet={true} />
        <AsideMenuItem to='/business/salaries' title='Mức lương' hasBullet={true} />
        <AsideMenuItem to='/business/recruitments' title='Danh sách tin tuyển dụng' hasBullet={true} />
        <AsideMenuItem to='/business/jobapplications' title='Danh sách CV' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/enterprise' title='Doanh nghiệp - Nhà đầu tư' icon='/media/icons/duotune/finance/fin006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/enterprise/enterpriseforumcategories' title='Danh mục diễn đàn đầu tư' hasBullet={true} />
        <AsideMenuItem to='/enterprise/projectinvestcategories' title='Danh mục dự án đầu tư' hasBullet={true} />
        <AsideMenuItem to='/enterprise/projectinvestforms' title='Danh mục hình thức đầu tư' hasBullet={true} />
        <AsideMenuItem to='/enterprise/lawdatas' title='Cơ sở dữ liệu luật' hasBullet={true} />
        <AsideMenuItem to='/enterprise/labormarketinformations' title='Thông tin thị trường lao động' hasBullet={true} />
        <AsideMenuItem to='/enterprise/enterpriseforumtopics' title='Diễn đàn đầu tư' hasBullet={true} />
        <AsideMenuItem to='/enterprise/projectinvestinformations' title='Dự án kêu gọi đầu tư' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/ecommerce' title='Cung cầu' icon='/media/icons/duotune/ecommerce/ecm001.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/ecommerce/ecommercecategories' title='Danh mục sản phẩm' hasBullet={true} />
        <AsideMenuItem to='/ecommerce/brands' title='Thương hiệu' hasBullet={true} />
        <AsideMenuItem to='/ecommerce/attributes' title='Danh mục thuộc tính' hasBullet={true} />
        <AsideMenuItem to='/ecommerce/sellers' title='Danh sách cần bán' hasBullet={true} />
        <AsideMenuItem to='/ecommerce/buyers' title='Danh sách cần mua' hasBullet={true} />
        <AsideMenuItem to='/ecommerce/partners' title='Danh sách tìm đối tác' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/market' title='Thị trường hàng hoá' icon='/media/icons/duotune/ecommerce/ecm004.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/market/marketcategories' title='Danh mục' hasBullet={true} />
        <AsideMenuItem to='/market/marketproducts' title='Sản phẩm' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/hotline' title='Tổng đài thông minh' icon='/media/icons/duotune/electronics/elc002.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/hotline/hotlinecategories' title='Danh mục' hasBullet={true} />
        <AsideMenuItem to='/hotline/hotlines' title='Danh sách tổng đài' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/alert' title='Thông tin cảnh báo' icon='/media/icons/duotune/general/gen007.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/alert/alertcategories' title='Danh mục cảnh báo' hasBullet={true} />
        <AsideMenuItem to='/alert/alertorganizations' title='Đơn vị cảnh báo' hasBullet={true} />
        <AsideMenuItem to='/alert/alertinformations' title='Thông tin cảnh báo' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/education' title='Giáo dục' icon='/media/icons/duotune/social/soc003.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/education/schools' title='Danh sách trường học' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/travel' title='Du lịch' icon='/media/icons/duotune/social/soc003.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/travel/tourguides' title='Hướng dẫn viên du lịch' hasBullet={true} />
        <AsideMenuItem to='/travel/travelhandbooks' title='Cẩm nang du lịch' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/medical' title='Y tế' icon='/media/icons/duotune/medicine/med001.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/medical/medicalhotlines' title='Danh bạ khẩn cấp' hasBullet={true} />
        <AsideMenuItem to='/medical/diseases' title='Danh mục bệnh' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/agriculture' title='Nông nghiệp' icon='/media/icons/duotune/abstract/abs047.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/agriculture/agriculturalengineeringcategories' title='Danh mục kỹ thuật nông nghiệp' hasBullet={true} />
        <AsideMenuItem to='/agriculture/agriculturalengineerings' title='Kỹ thuật nông nghiệp' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/admin' title='Quản trị công dân' icon='/media/icons/duotune/communication/com006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/admin/users' title='Công dân' hasBullet={true} />
        <AsideMenuItem to='/admin/companies' title='Doanh nghiệp' hasBullet={true} />
        <AsideMenuItem to='/admin/roles' title='Vai trò' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/system' title='Quản trị hệ thống' icon='/media/icons/duotune/coding/cod009.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/system/notifications' title='Thông báo' hasBullet={true} />
        <AsideMenuItem to='/system/auditlogs' title='Nhật ký' hasBullet={true} />
        <AsideMenuItem to='/system/sysconfigs' title='Cấu hình hệ thống' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/*       <div className='menu-item'>
        <a target='_blank' className='menu-link' href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}>
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  );
}
