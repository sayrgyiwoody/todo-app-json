import React, { memo, useCallback, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const UserName = () => {

    // console.log('username called');

    const [userName,setUserName] = useLocalStorage('userName','Wai Yan Tun');

    const [editStatus,setEditStatus] = useState(false);

  return (
    <div>
      {editStatus == false ? (
        <>
        <h2 className=' cursor-pointer' onDoubleClick={() => setEditStatus(true)}>Hello <span className=' font-semibold'>{userName}</span></h2>
    </>
      ) : (
        <input onDoubleClick={()=>setEditStatus(false)} autoFocus onKeyDown={(e)=> {
            if(e.key === "Enter"){
                setUserName(e.target.value)
                setEditStatus(false);
            }else if (e.key === "Escape"){
                setEditStatus(false);
            }
        }}  defaultValue={userName} placeholder='Enter user name' type="text" className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      ) }

    </div>
  )
}

export default memo(UserName)

// export default UserName

