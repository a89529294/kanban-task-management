import { MyButton } from "@/components/common/my-button";
import { useCloseDialogAfterSubmission } from "@/hooks/use-close-dialog-after-submission";
import { useFormStatus } from "react-dom";

export function ColumnEditDropdownSubmitBtn({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const pending = useCloseDialogAfterSubmission(closeDialog);

  return (
    <MyButton
      disabled={pending}
      type="submit"
      className="w-full"
      size="short"
      variant="destructive"
    >
      Delete
    </MyButton>
  );
}
