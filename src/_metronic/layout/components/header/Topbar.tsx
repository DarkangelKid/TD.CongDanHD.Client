import clsx from 'clsx';
import React, {FC} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '../../../../setup';

import {toAbsoluteUrl} from 'src/utils/AssetHelpers';
import {toAbsoluteUrl as toAbsoluteUrlMetronic, KTSVG} from 'src/_metronic/helpers';
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search} from '../../../partials';
import {useLayout} from '../../core';
import {UserModel} from '../../../../app/modules/auth/models/UserModel';

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1';

const Topbar: FC = () => {
  const {config} = useLayout();
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel;

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      {/* <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        <Search />
      </div> */}

      {/* Activities */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div className={clsx('btn btn-icon btn-active-light-primary btn-custom', toolbarButtonHeightClass)} id='kt_activities_toggle'>
          <KTSVG path='/media/icons/duotune/general/gen032.svg' className={toolbarButtonIconSizeClass} />
        </div>
      </div> */}

      {/* NOTIFICATIONS */}
      {/*  <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx('btn btn-icon btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG path='/media/icons/duotune/general/gen022.svg' className={toolbarButtonIconSizeClass} />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      {/* CHAT */}
      {/*  <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx('btn btn-icon btn-active-light-primary btn-custom position-relative', toolbarButtonHeightClass)}
          id='kt_drawer_chat_toggle'
        >
          <KTSVG path='/media/icons/duotune/communication/com012.svg' className={toolbarButtonIconSizeClass} />

          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div>
      </div> */}

      {/* Quick links */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx('btn btn-icon btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG path='/media/icons/duotune/general/gen025.svg' className={toolbarButtonIconSizeClass} />
        </div>
        <QuickLinks />
      </div> */}

      {/* begin::User */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)} id='kt_header_user_menu_toggle'>
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img
            src={
              user.imageUrl
                ? user.imageUrl.includes('https://') || user.imageUrl.includes('http://')
                  ? user.imageUrl
                  : toAbsoluteUrl(`/${user.imageUrl}`)
                : toAbsoluteUrlMetronic('/media/avatars/300-1.jpg')
            }
            alt='metronic'
          />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px' id='kt_header_menu_mobile_toggle'>
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  );
};

export {Topbar};
