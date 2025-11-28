import React from 'react';

export default function DModal({ show, type = 'info', title, message, onClose, onConfirm }) {
  if (!show) return null;

  let icon, btnClass, confirmText;
  switch (type) {
    case 'delete':
      // Using an emoji icon
    //   icon = <span style={{color: 'red', fontSize: '2rem'}}>🗑️</span>;
      btnClass = 'z_admin_btn z_admin_btn_danger';
      confirmText = 'Delete';
      break;
    case 'update':
      // Using an emoji icon
    //   icon = <span style={{color: 'orange', fontSize: '2rem'}}>✏️</span>;
      btnClass = 'z_admin_btn z_admin_btn_warning';
      confirmText = 'Update';
      break;
    case 'success':
      // Using an emoji icon
    //   icon = <span style={{color: 'green', fontSize: '2rem'}}>✔️</span>;
      btnClass = 'z_admin_btn z_admin_btn_success';
      confirmText = 'OK';
      break;
    default:
      // No icon for default/info
    //   icon = null;
      btnClass = 'z_admin_btn';
      confirmText = 'OK';
  }
  

  return (
    <div className="z_admin_modal_overlay" onClick={onClose}>
      <div className="z_admin_modal" onClick={e => e.stopPropagation()}>
        <div className="z_admin_modal_header">
          {/* {icon} */}
          <h2>{title}</h2>
        </div>
        <div className="z_admin_modal_body">
          <p className='text-light'>{message}</p>
        </div>
        <div className="z_admin_modal_footer">
          {/* For delete/update/info, show a confirmation button */}
          {type !== 'success' && (
            <button className={btnClass} onClick={onConfirm}>{confirmText}</button>
          )}
          {/* Always show the close button */}
          <button className="z_admin_btn z_admin_btn_secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}