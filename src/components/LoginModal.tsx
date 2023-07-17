import { setOpenLoginModal } from "@/redux/features/user/userSlice"
import { useAppDispatch } from "@/redux/hook"
import { Dialog, DialogBody } from "@material-tailwind/react"
import { SigninForm } from "./SigninForm"

export function LoginModal({ openLoginModal }: boolean | any) {
    const dispatch = useAppDispatch()
    return (
        <Dialog open={openLoginModal} handler={() => dispatch(setOpenLoginModal(false))}>
            <DialogBody>
                <div className={`h-96 flex justify-center items-center`}>
                    <SigninForm />
                </div>
            </DialogBody>

        </Dialog>
    )
}