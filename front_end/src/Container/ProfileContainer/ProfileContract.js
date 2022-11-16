import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { getUserContracts } from '../../api/ContractAPI'

const ProfileContract = () => {
    const [contracts, setContracts] = useState(null)

    useEffect(() => {
        getUserContracts(setContracts)
    }, [])

    return (
        <div className="profile-container">
            <Row>
                <h1 className="profile-title">Quản lý hợp đồng</h1>
            </Row>
            <div className="table-container">
                <table className="table-blog">
                    <tr>
                        <th>Người thuê</th>
                        <th>Người cho thuê</th>
                        <th>Số tiền (VNĐ)</th>
                        <th>Ngày thuê</th>
                        <th>Ngày hết hạn</th>
                        <th>Link bài thuê</th>
                    </tr>
                    {contracts && contracts.data[0].map((contract, index) => {
                        return <tr>
                        <td>{contract.user1.name}</td>
                        <td>{contract.user2.name}</td>
                        <td>{contract.rent}</td>          
                        <td><Moment format="MM/DD/YYYY">
                        {contract.created_at}
                        </Moment></td>
                        <td>{contract.expirationDate}</td>
                        <td><Link to={`/post/${contract.rentItemId}`}>Dẫn đến bài đăng</Link></td>
                    </tr>
                    })}
                </table>
                {contracts && <Pagination
                    activePage={contracts.current_page}
                    itemsCountPerPage={contracts.per_page}
                    totalItemsCount={contracts.total}
                    pageRangeDisplayed={5}
                    onChange={(num) => getUserContracts(setContracts, num)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />}
            </div>
        </div>
    )
}

export default ProfileContract
