import React from 'react'

export default function index() {
  return (
    <div className="content">
       {/* <div
                    className=" full-page full-page-background"
                    style={{
                        backgroundImage: `url(${require("assets/images/table_img.png")})`,
                    }}
                /> */}
                <img
                    style={{ paddingBottom: 56, width:'100%', height:'100%' }}
                    alt="..."
                    src={require("assets/images/employees_img.png")}
                />
    </div>
  )
}
