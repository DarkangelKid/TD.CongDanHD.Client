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
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem to='/builder' icon='/media/icons/duotune/general/gen019.svg' title='Layout Builder' fontIcon='bi-layers' />

      <AsideMenuItemWithSub to='/general' title='Danh mục chung' icon='/media/icons/duotune/communication/com006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/general/categories' title='Lĩnh vực' hasBullet={true} />
        <AsideMenuItem to='/general/areas' title='Địa bàn' hasBullet={true} />
        <AsideMenuItem to='/general/placetypes' title='Loại địa điểm' hasBullet={true} />
        <AsideMenuItem to='/general/places' title='Địa điểm' hasBullet={true} />
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

      <AsideMenuItemWithSub to='/admin' title='Quản trị công dân' icon='/media/icons/duotune/communication/com006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/admin/users' title='Công dân' hasBullet={true} />
        <AsideMenuItem to='/admin/business' title='Doanh nghiệp' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/system' title='Quản trị hệ thống' icon='/media/icons/duotune/coding/cod009.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/system/notifications' title='Thông báo' hasBullet={true} />
        <AsideMenuItem to='/system/auditlogs' title='Nhật ký' hasBullet={true} />
        <AsideMenuItem to='/system/sysconfigs' title='Cấu hình hệ thống' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <AsideMenuItemWithSub to='/crafted/pages' title='Pages' fontIcon='bi-archive' icon='/media/icons/duotune/general/gen022.svg'>
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/connections' title='Connections' hasBullet={true} />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub to='/crafted/accounts' title='Accounts' icon='/media/icons/duotune/communication/com006.svg' fontIcon='bi-person'>
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='/media/icons/duotune/general/gen040.svg'>
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub to='/crafted/widgets' title='Widgets' icon='/media/icons/duotune/general/gen025.svg' fontIcon='bi-layers'>
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub to='/apps/chat' title='Chat' fontIcon='bi-chat-left' icon='/media/icons/duotune/communication/com012.svg'>
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem to='/apps/user-management/users' icon='/media/icons/duotune/general/gen051.svg' title='User management' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a target='_blank' className='menu-link' href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}>
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div>
    </>
  );
}
