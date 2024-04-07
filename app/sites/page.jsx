import React from 'react'

const Sites = () => {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-0 md:col-span-2">
            </div>
            <div className="col-span-12 md:col-span-8">
                <ul className="menu bg-base-200 w-56 rounded-box">
                    <li>
                        <h2 className="menu-title">لیست سایت ها </h2>
                        <ul>
                            <li><a href='https://clicktlick.netlify.app/'>سایت ۱</a></li>
                            <li><a href='https://clickplick.netlify.app/'>سایت ۲ </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="col-span-0 md:col-span-2">
            </div>
        </div>
    )
}

export default Sites