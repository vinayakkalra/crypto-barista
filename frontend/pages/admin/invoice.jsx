import React from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import { CiCircleChevLeft } from "react-icons/ci";

const Invoice = ({
  userId,
  awb,
  paymentAddress,
  products,
  orderId,
  onAfterPrint,
}) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: onAfterPrint, // Pass the callback
  });

  const totalQuantity = products?.reduce((total, product) => {
    return total + (product?.quantity || 0);
  }, 0);

  React.useEffect(() => {
    if (handlePrint) {
      handlePrint();
    }
  }, [handlePrint]);

  return (
    <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
      {/* <div className="flex gap-5 justify-end">
        <div>
          <button
            onClick={downloadReport}
            className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
          >
            Download Report
          </button>
        </div>
        <div>
          <Link
            to={`/admin/orders/${param.id}`}
            className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
          >
            <CiCircleChevLeft className="w-5 h-5" /> Go back
          </Link>
        </div>
      </div> */}

      <div
        ref={componentRef}
        style={{
          border: "3px solid black",
          height: "auto",
          marginTop: "30px",
        }}
      >
        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
          <div style={{ display: "flex" }}>
            {/* <!-- left --> */}
            <div
              style={{
                flex: 1,
                borderRight: "3px solid black",
                padding: "15px",
              }}
            >
              <h3>1444 Nomizo</h3>
              <p>GST NO: 03AAMFK4965G1Z6</p>
              <p>486, Kidwai Nagar, Janakpuri</p>
              <p>141008 - Ludhiana, Punjab, India</p>
            </div>
            {/* <!-- right --> */}
            <div style={{ flex: 1, padding: "15px" }}>
              <div style={{ display: "flex", borderBottom: "3px solid black" }}>
                <div
                  style={{
                    flex: 1,
                    borderRight: "3px solid black",
                    padding: "15px",
                  }}
                >
                  Order No. (REF): {orderId}
                </div>
                <div style={{ flex: 1, padding: "15px" }}>GST-JR-3557</div>
              </div>
              <div
                style={{
                  flex: 1,
                  borderBottom: "3px solid black",
                  padding: "15px",
                }}
              >
                Mode: Prepaid
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "15px" }}>
                Courier Partner: COFFEECULTURE
              </div>
            </div>
          </div>

          <div style={{ borderTop: "3px solid black", padding: "15px" }}>
            <h3>KARAN KHABIA (M) 9925710506</h3>
            <p>Address: 76, vishwas colony, alkapuri</p>
            <p>Landmark: 6, shitj</p>
            <p>Pincode: 390007, Vadodara, GJ, IN</p>
          </div>
          <div style={{ border: "3px solid black", padding: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <h2>AWB: {awb} </h2>
              <Barcode value={awb} />
            </div>
            {/* Table */}
            <table
              style={{
                border: "3px solid black",
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: "10%", borderLeft: "1px solid black" }}>
                    S.No.
                  </th>
                  <th style={{ width: "70%", borderLeft: "1px solid black" }}>
                    Product(s)
                  </th>
                  <th style={{ width: "20%", borderLeft: "1px solid black" }}>
                    QTY(Pcs)
                  </th>
                </tr>
              </thead>
              <tbody style={{ border: "3px solid black" }}>
                {products?.map((product, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "3px solid black",
                      paddingBottom: "300px",
                    }}
                  >
                    <th style={{ borderLeft: "1px solid black" }}>
                      {index + 1}
                    </th>
                    <td style={{ borderLeft: "1px solid black" }}>
                      {product?.title}
                    </td>
                    <td style={{ borderLeft: "1px solid black" }}>
                      {product?.quantity}
                    </td>
                  </tr>
                ))}
                <tr style={{ height: "30px" }}>
                  <th style={{ borderLeft: "1px solid black" }}></th>
                  <td style={{ borderLeft: "1px solid black" }}></td>
                  <td style={{ borderLeft: "1px solid black" }}></td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <th style={{ borderLeft: "1px solid black" }}></th>
                  <td style={{ borderLeft: "1px solid black" }}></td>
                  <td style={{ borderLeft: "1px solid black" }}></td>
                </tr>
                <tr style={{ borderTop: "3px solid black" }}>
                  <th style={{ borderLeft: "1px solid black" }}>
                    T{products?.length}
                  </th>
                  <td style={{ borderLeft: "1px solid black" }}>
                    T{products?.length}
                  </td>
                  <td style={{ borderLeft: "1px solid black" }}>
                    {totalQuantity}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <h5 style={{ fontWeight: "bold" }}>{orderId}</h5>
              <Barcode value={orderId} />
            </div>
          </div>
          <div style={{ borderTop: "3px solid black", padding: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <h2>TAX INVOICE - 444 Nomizo</h2>
              <p style={{ fontWeight: "bold" }}>
                This is computer generated tax invoice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
