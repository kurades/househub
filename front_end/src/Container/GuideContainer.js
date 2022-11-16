import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
const GuideContainer = () => {
    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="guide-field">
                    <article className="guide-article">
                        <h2>Hướng dẫn đăng tin</h2>
                        <div className="article-body">
                            <p>Chào bạn, sau đây là hướng dẫn sử dụng cho thành viên website houseHub.</p>
                            <p>Nếu bạn chưa có tài khoản, hãy <Link to="/join" className="highlight-link">đăng ký tại đây</Link> trước khi bắt đầu đăng tin mới. (Lưu ý: bạn phải cập nhật thông tin cá nhân trước khi đăng tin)</p>
                            <p>Nếu đã có tài khoản, sau khi đăng nhập vào website, bạn bấm vào nút <Link to="/Post" className="highlight-link">ĐĂNG TIN</Link> để bắt đầu.</p>
                            <p>Khi đăng tin các bạn đọc kỹ mô tả từng bước, nhập đầy đủ và chính xác nội dung cho tin đăng, đặc biệt là mục Giá và Diện tích. Những tin có nội dung hình ảnh rõ ràng, đầy đủ sẽ có tỉ lệ xem cao hơn 50%.</p>
                            <p>Lưu ý khi đăng tin:</p>
                            <p>+ Điền đầy đủ các thông tin bắt buộc vào các ô nhập liệu trong phần đăng tin.</p>
                            <p>+ Phần giá cho thuê, vui lòng nhập chính xác 1 giá duy nhất (Không nhập giá từ ....đến ....) và chọn đúng đơn vị giá là triệu/tháng hoặc nghìn/tháng. Ví dụ bạn cho thuê 3 triệu/tháng thì bạn nhập đủ như sau 3000000 (1 số 3 và 6 số 0)</p>
                            <p>+ Diện tích nhập đúng 1 diện tích duy nhất (Không nhập diện tích từ ....đến ....)</p>
                            <p>+ Sau khi nhập đầy đủ các thông tin, bấm ĐĂNG TIN NGAY và chờ vài giây để tin bạn hiển thị trên website, nếu đăng tin thành công hệ thống sẽ báo bạn đã đăng tin thành công, nếu hệ thống cảnh báo màu đỏ, các ô chọn màu bị sai, vui lòng nhập lại cho chính xác và bấm ĐĂNG TIN NGAY lại.</p>
                        </div>
                    </article>
                    <article className="guide-article">
                        <h2>Hướng dẫn đăng ký hợp đồng</h2>
                        <div className="article-body">
                            <p>Đăng nhập bằng tài khoản đã có đầy đủ thông tin</p>
                            <p>Chọn bất kỳ bài đăng nào bạn quan tâm</p>
                            <p>Chọn đặt cọc và sử dụng bất kỳ hình thức thanh toán nào website đề cập</p>
                            <p>Bấm vào nút xác nhận, khi xác nhận đồng nghĩa với việc bạn đã chấp nhận các <Link to="/terms" className="highlight-link"> điều khoản </Link> website đưa ra</p>
                            <p>Nếu thành công website sẽ hiện một thông báo màu xanh với chữ đặt cọc thành công, ngược lại website sẽ đưa ra thông báo màu đỏ với dòng chữ thất bại</p>
                        </div>
                    </article>
                    <article className="guide-article">
                        <h2>Các phương thức thanh toán hiện có của website</h2>
                        <div className="article-body">
                            <p>Quý khách có thể chọn các hình thức thanh toán sau:</p>
                            <p>+ Thanh toán qua ví điện tử Momo cho số điện thoại chủ nhà trọ đã cung cấp</p>
                            <p>+ Thanh toán qua Zalo Pay cho số điện thoại chủ nhà trọ đã cung cấp</p>
                            <p>+ Thanh toán qua ViettelPay cho số tài khoản chủ nhà trọ đã cung cấp</p>
                        </div>
                    </article>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default GuideContainer
