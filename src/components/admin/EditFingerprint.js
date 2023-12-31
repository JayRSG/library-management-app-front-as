import { useDeviceData } from '@/hooks/useDeviceWS';
import { fetcher } from '@/lib/axios';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const EditFingerPrint = (props) => {
  const { userData, userType, submitButtonAction, saveButtonState, handleCloseModal } = props

  const { deviceData, isScanning, socket, communicateDevice } = useDeviceData()
  const [fingerprintId, setFingerprintId] = useState(null)
  const [showMessage, setShowMessage] = useState("")
  const [verified, setVerified] = useState(false)
  const [reassignState, setReassignedState] = useState({
    userId: null,
    fingerId: null
  })


  useEffect(() => {
    setShowMessage("Scan Fingerprint")
  }, [isScanning])



  async function getFingerprintId() {
    return await fetcher({
      url: "/user/fingerprint_manage",
      params: {
        operation: "retrieve"
      }
    })
      .then(res => res?.data)
      .catch((error) => {
        alert(error?.response?.data?.message)
      })
  }

  async function storeFingerprint(fingerprintId) {
    return await fetcher({
      url: "/user/fingerprint_manage",
      params: {
        operation: "store",
        fingerprint_id: fingerprintId
      }
    })
      .then(res => res?.data)
      .catch((error) => {
        alert(error?.response?.data?.message)
      })
  }

  function reAssignFinger(userId, fingerprintId) {
    if (!isScanning && fingerprintId != null) {
      setShowMessage("Reassign Fingerprint")
      communicateDevice({ command: "enroll", id: fingerprintId });
      setReassignedState({ userId: userId, fingerId: fingerprintId })
    }
  }

  useEffect(() => {
    if (deviceData) {
      let data = null
      if (typeof deviceData == "string") {
        data = JSON.parse(deviceData)
      } else {
        data = deviceData
      }
      console.log(data)

      setShowMessage(data)

      if (data?.message == "Enrollment Successful" && fingerprintId && saveButtonState && !reassignState?.fingerId && !reassignState?.userId) {
        storeFingerprint(fingerprintId)
          .then(res => {
            const FingerprintSlot = res
            console.log(FingerprintSlot)
            if (FingerprintSlot) {
              submitButtonAction(userData?.id, FingerprintSlot)
              socket.close()
            }
          })
          .catch(error => {
            alert(error?.response?.data?.message)
          })
      } else if (data?.message == "Enrollment Successful" && reassignState?.fingerId && reassignState?.userId) {
        if (reassignState?.fingerId) {
          socket.close()
          setVerified(false)
          alert("Fingerprint re-assigned successfully")
          handleCloseModal()
        }
      }

      if (data?.message == "Fingerprint Matched") {
        setVerified(true)
      }
    }
  }, [deviceData, reassignState?.fingerId, saveButtonState])

  async function performFingerprintActions() {
    if (!isScanning) {
      if (userData?.fingerprint_id != null) {
        console.log("Fingerprint found, verifying now!");
        setShowMessage("Verify")
        setVerified(false)

        communicateDevice({ command: "verify", id: userData?.fingerprint_id });
      } else {
        const retrievedFingerId = await getFingerprintId()
        setFingerprintId(retrievedFingerId)
        setShowMessage("Enroll New Fingerprint")

        communicateDevice({ command: "enroll", id: retrievedFingerId });
      }
    }
  }

  return (
    <>
      <h2 className="text-center" onClick={(e) => {
        e.stopPropagation()
        performFingerprintActions()
      }}>
        <FontAwesomeIcon icon={faFingerprint} size='xl' />
      </h2>

      <div className='text-center'>
        <h4 className='text-xl' onClick={(e) => {
          e.stopPropagation()
          performFingerprintActions()
        }}>{showMessage?.action || "Press to start"}</h4>

        <div>{showMessage?.message}</div>
      </div>

      <section>
        {
          verified ?
            <div>
              <button className='bg-info text-white rounded form-control' style={{ marginTop: "50px" }}
                onClick={(e) => {
                  e.stopPropagation()
                  reAssignFinger(userData?.id, userData?.fingerprint_id)
                }}>Re-assign Fingerprint</button>
              <button className='bg-danger text-white rounded form-control' style={{ marginTop: "10px" }}>Delete Fingerprint</button>
            </div> : ""
        }
      </section>


    </>
  )
}

export default EditFingerPrint