import { useEffect } from "react"
import { useState } from "react"

const PayFine = (props) => {
  const { user_id, book_name, user_name, book_borrow_id, fined_days, fine, finePaymentSubmit, payFinePressed } = props
  const [formData, setFormData] = useState({
    user_id: user_id,
    book_borrow_id: book_borrow_id,
    fine: fine,
    late_fine_pending: null,
    fine_excused: false
  })

  useEffect(() => {
    if (user_id && book_borrow_id && fine)
      setFormData({
        ...formData,
        user_id: user_id,
        book_borrow_id: book_borrow_id,
        fine: fine,
      })
  }, [user_id, book_borrow_id, fine])


  useEffect(() => {
    if (payFinePressed) {
      if (formData?.user_id && formData?.book_borrow_id) {
        console.log("pay Fine is pressed", formData)
        finePaymentSubmit(formData)
      }
    }

  }, [payFinePressed])


  return (
    <>
      <form>
        <div className="form-group col-md-12">
          <label className="col-md-12">User <input name="user" defaultValue={user_name} className="form-control" type="text" />
          </label>
        </div>

        <div className="form-group col-md-12">
          <label className="col-md-12">Book Name <input name="book_name" defaultValue={book_name} className="form-control" type="text" />
          </label>
        </div>

        <div className="form-group col-md-12">
          <label className="col-md-12">Days Fined <input name="fined_days" defaultValue={fined_days} className="form-control" type="text" /></label>
        </div>

        <div className="form-group col-md-12">
          <label className="col-md-8 m-r-5">Due Fine Amount<input name="fine" value={formData?.fine} className="form-control" type="number" max={fine}
            onChange={e => {
              e.stopPropagation()
              setFormData({ ...formData, fine: e.currentTarget.value, late_fine_pending: (fine - e.currentTarget.value) })
            }}
            onKeyUp={(e) => {
              e.stopPropagation()
              const newValue = e.currentTarget.value;
              if (newValue > fine) {
                e.currentTarget.value = fine;
                setFormData({
                  ...formData,
                  fine: fine,
                  late_fine_pending: 0, // Assuming late_fine_pending should be 0 when fine is set to the maximum.
                });
              } else {
                setFormData({
                  ...formData,
                  fine: newValue,
                  late_fine_pending: fine - newValue,
                });
              }
            }}
            onBlur={(e) => {
              e.stopPropagation()
              const newValue = e.currentTarget.value;
              if (newValue > fine) {
                e.currentTarget.value = fine;
                setFormData({
                  ...formData,
                  fine: fine,
                  late_fine_pending: 0, // Assuming late_fine_pending should be 0 when fine is set to the maximum.
                });
              } else {
                setFormData({
                  ...formData,
                  fine: newValue,
                  late_fine_pending: fine - newValue,
                });
              }
            }}
          /></label>
          <label><input onClick={(e) => {
            if (e.currentTarget.checked) {
              setFormData({ ...formData, fine: "", late_fine_pending: 0, fine_excused: true })
            } else {
              setFormData({ ...formData, fine: fine, late_fine_pending: null, fine_excused: false })
            }
          }} type="checkbox" /> Excuse Fine</label>
        </div>
      </form>
    </>
  )
}

export default PayFine