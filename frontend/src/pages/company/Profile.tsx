import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCompany } from "redux/actions/company";
import { RootState } from "redux/reducers";
import { ICompany } from "redux/types/company";
import UpdateProfile from "pages/company/UpdateProfile";
import { Box } from '@mui/material';

const Profile: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [companys, setCompanys] = React.useState<ICompany[]>([]);
    const company = useSelector((state: RootState) => state.company);

    React.useEffect(() => {
        dispatch(getProfileCompany());
    }, [dispatch]);

    React.useEffect(() => {
        setCompanys(() =>
            company?.companys?.filter((company: any) =>
                company.username
            ));
    }, [company]);

    React.useEffect(() => {
        document.title = "Profile Company | TTS";
    }, []);

    return (
        <Box >
            {companys.map((company: any) =>
                <UpdateProfile company={company} key={company._id} />
            )}
        </Box>
    );
};

export default Profile;
