import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TBSSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    mode?: "multiple" | undefined;
    disabled?: boolean;
};

const BSSelect = ({ label, name, options, disabled, mode }: TBSSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label} style={{ fontWeight: "bold" }}>
                    <Select
                        mode={mode}
                        style={{ width: "100%" }}
                        {...field}
                        options={options}
                        size="large"
                        disabled={disabled}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error?.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};

export default BSSelect;
