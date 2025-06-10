import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../Store/store';
import { ReactNode } from 'react';


type RouteGuardProps = {
    children: ReactNode;
    bizOnly?: boolean;
    adminOnly?: boolean;
}

const RoutGuard = (props: RouteGuardProps) => {

    const { children, bizOnly, adminOnly } = props;

    const user = useSelector((state: TRootState) => { return state.userSlice.user });




    if (user === null) {
        return <Navigate to="/signin" />;
    }
    if (bizOnly && !user.isBusiness) {
        return <Navigate to="/" />;
    }
    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/home" />;
    }
    return <>{children}</>;

}
export default RoutGuard;