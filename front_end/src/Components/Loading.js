import React from 'react'
import ReactLoading from 'react-loading';

function Loading() {
    return (
        <>
            <div style={{ "height": "100vh","width":"100vw","position":"fixed","backgroundColor":"white","zIndex":"20" }} id="loading">
                <div class="d-flex align-items-center justify-content-center h-100 text-white" style={{"height":"100%"}}>
                    <ReactLoading type={"bars"} color={'#0061FF'} height={'10%'} width={'10%'} />
                </div>
            </div>
        </>
    )
}

export default Loading