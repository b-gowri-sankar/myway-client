import axios from "axios";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import LoginModle from "./LoginModle";
import SignUpModel from "./SingUpModel";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleRelaod }) => {
	const [showModel, setShowModel] = React.useState(false);
	const [showSignUpModel, setShowSignUpModel] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [token, setToken] = React.useState(0);
	const [userData, setUserData] = React.useState({});

	const navigate = useNavigate();

	React.useEffect(() => {
		let localToken = localStorage.getItem("token");
		setToken(localToken);
	}, []);

	React.useEffect(() => {
		if (token) {
			let decode = jwtDecode(token);
			setUserData(decode);
		}
	}, [token]);

	const handleSubmitData = async (entryData) => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_END_POINT}api/auth/register`,
				{
					...entryData,
				}
			);
			if (data?.email) {
				setShowModel(true);
				handleRelaod && handleRelaod();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			setShowSignUpModel(false);
		}
	};

	const handleSubmit = async (entryData) => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_END_POINT}api/auth/login`,
				{
					...entryData,
				}
			);
			if (data?.token) {
				localStorage.setItem("token", data?.token);
				let decode = jwtDecode(data?.token);
				setUserData(decode);
				setToken(data?.token);
				handleRelaod && handleRelaod();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			setShowModel(false);
		}
	};

	return (
		<div
			style={{
				height: "75px",
				fontSize: "22px",
				fontWeight: "400",
				backgroundColor: "white",
				boxShadow: "5px 5px 15px #eee,-5px -5px 15px #f4f4f4 !important",
			}}
			className="d-flex justify-content-between align-items-center p-5"
		>
			{isLoading && (
				<div className="position-absolute" style={{ top: "50%", left: "50%" }}>
					<Spinner animation="border" variant="primary" />
				</div>
			)}
			<div className="d-flex align-items-center">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAABHNCSVQICAgIfAhkiAAAGw9JREFUeF7tW3mUFdWd/u69tbytX6+AgEZQQVlsF0SNCyLGRB2jk8XE0YnGmWxzkElABBFpH5shGoWIcQxjxmSyKh4dNS4ZdzESQIPKoiCboEgDvb69qu69c3633mu6mwc0ajL/pM7hNP3qVdWt736/77c2w98PgwD7Ow4hAn9zIFKpFB+5biR7rvY5PmjQoK7n79y5Uw/aOEhjPFQqldIA6N/f7PibAJH6TiqWd/LHulXWydriJwvOk4yzKGfcBsCh6WC+0sqTSnsc2Ot7/ppcJvd+FNGNP/zpD9sAqL8mKn8tINjN3/9+f7e6ulFwazwYu8hy7WO4JaoAiN4vxBgjLLo+ZoxprZRUSnsyCHbrQC3Tvnw88PXKl1e8vPOll14KPm1QPnUgUtOmDeK2e40Vj35ZWNYJnLNY+PK6G9fDxxIA5aMHEODm4xAaBQamtFZFGcgthVzhCdmeu3/e4js2f5pgfGpAzLxh5tFOVFzmRCPfEY41EoyZtym/rDF6HYpSCYYDvocqQ9Z9dVqb67TWSvrBNi/v/d7Lew86CWd9KpX6xAz5xEBcccUVzvDjjvt6IpmczIUYJQS3ldZd9+0CwmyveRWwQ+jgPu7sg627dpLpKKWkluqDQib3u2xr/u477r1j1ydhyCcBgs2YNGNEvF90shOLfgOA253q+1G+RIfSrkJ3M4t9Diw0BkaAldhT/qmJX72uIXNigPKL3upCrjif7+F/TC1J5T4OIB8biKbpTRdHk+5PhOscUxbA3kCYhZaEUNGKwVHwfbS0taMzk0E2n4fv+WbdlmUh4jpIVCXRv6Ya8WgMTEtwrUPFMOTYf7lKKXDOiSG5fCb3QEtry9TFixcXDxeMwwYilUpFVKCujsajs23HHqQVWJchmLtpcAWz4+TvsoUiWtvb0dzWjt2trUhnc1CaznNjIF0LMIwhJmgIKERdBw11dRhQX4/6mmpUx2MGEAKGnqeYuUmJPSHg5H6L2dxTuULhxgULFmw6HDAOH4hZqR9Eq2JzuOAJeg+t9m1UaNv0jyPv+Vi/aTO2NzejECjIEjsOZ3EECteAa9mor05g1AnD0VCVAFPSPJQA5aEmh881OGrl5YovtnW0XXnnnXfu7evz+gwEMQFSfi+SSKSEJZLlzQzAIIjCUFBaIJv38O7OnXh/xw4UPA+KFlra6UoacrCFGpdKLwtil4bgwJFH9MMJRw9B/6okGLGD6FdSljK/lFYqKHov+5nMd1J9ZEafgZg1a9a/JKoSi7gQCQoDyy/FFAVDEpoz7E5nsPyNN5HxAvMCxmTMRjHizmEH9PtiC2YuJ50hSFzBMerYY3D80KGhjpA5hkZp9keHQagq5PKPqDXq6tTSlHcoZvQFCNY0vemiWG1sibCtwfvlJ0rBZxzrNm/F+s2bIRkDV2W67nu8AaUvTysHUt1wo2uN7tC5sg5B4agjjsApI05AzLEgyEZDFYFiFIQBWqlCPpO7Fx/tnJVasuSg3uSQS5txw4yRyfqqRy3HGRZubc+jqIr40xtr8VFr2tCXTKRkseFP8hqlCw/5sH3WbhhA+lAOPwITYXLzWXhfbQSqynFw3pmnoybq9ACCvsMBLaXMF9L576bmpn59MFYcdG0ULDU2Nt7nxiLXMA1BJis5g0UCCY2Clli19j1s3/kRpJECCoYB4/N7H6VcwuyqDPLKC1YrqZbli7ltrh1Jy6LvatdqsF3rJMHs84UrBkBrHuoLqcT+jApDE4baeARnn3Yyqt0IuCLdYIY5ZFqCcR3ki2szu3KXz7tn3tYDgXFQIGZOuenr1QPrf8k4c8tbo0E2CXgQeGXVKuxq6QCpWFmyzC5WuCsBQD6f+X5boTWT0rnan23a9HRFfz969JkjkIwsYfHoWYxz2tjKYTmJJZ3TgMOBS8aPQ8KiHRHlINac54zpTHv6dxDsulSqsl4cEIjp06d/prq6+lHLsU8NUQx3henA6MCaLe9j7aZtxhxo18rB04GAoI3y8/mtKl+ctPH1Pz19qHrD8OFjGqz65Dwed7/JBXNDq+y1XApiAARkMgCO7leLz57aCFv3DOKNNSnVmm3vuHLObbc9W4kVBwRibtPsiU4iehcXnIyvpMOhtbcW8nhm2Z+gKKnsdoeD0UsX/TY/m/vaO6tefe5QCl4+P+Tkk2sS8eqHeDx6IRhtxP5AmLWVYglLSYwafhxGHzPEBF7GmoxGGeHUxWzhwaZU0z/1GYgZkyb1q+o/8Fk75jSWt8G4JK2RK0g8t3IVOgoFiLIYlNZn7LIkat0fprUO/HR24TvLX55+KCb0XuTIk8adwmojTwnXPqI30PtKGOVEjqDimDB2NPrV1sPqBhyZiApkS7ot/Y/zfzT/1d7PqbiJM6fPnFLbv/Z2pbRgvPyWGpGCi2XNa7DuvQ/gehxFNweoKCxdhFACRQuwAxukmJIr81lAobT0m3O72r6wdd3Kt/rKhu7fO/7scfe78errmJFhMsVQkSXTsOCB+wl4dg7QNhgv4Kjao3Bh4+koum2I56uQjhaNudCRb08/sqe99are+ch+QMyYMaO+qqrqCcuxP1umFv2UTML3gSdfWYlCsWDoSBIppI2iJRGIADHPgi98A4AUdI4ZL1PIZP7s59jF2958qf3jAHHsmed+M1ZV9TPOmDHTUjZfCtroFTxwTVU/BQrwPAe49NQTUVPfYGIariVAmkvvEQQ7s63Zi+b+aO6a7mvZD4g5M2adHalL/gEMNT1KaAxY+86HeGPHZsQsH2cM74QvbazdotHhJWArDSkKYIqyRg4pJCzJQLFVZ/Oeh+os+c9vvPFGmGoe5jH8zPMujiRjDzPGqdplDhJnrS0TbESdLCaMkvhMf4Zl6zne+8BB0u2PC8edAK0jcMiTlUJxrbXnZ/ITZ6aa7j84ELfOuTlSFZ3NGLPKD6SfBc/HUyv+jGMaspj29SJGDpTwhcbmXRZ+8YyLl1c78EmtOWCRSQgJQeE3gPSelt+OGXbUNUuXLpWHiYH5+oix48bZNbEnGReU6JXqm5T2AsP6FzHtah+NR3FIKw3uV+F3r3D8x+MRjB87BgNq6uBzCatU/qPLvWx+6cymWVd216sejLjiiivEyY0nvWJH3bP2VZZC9d25px0vv/UmZn+zFZ8fxRBY5EY5ogGpto/FT8fx2+dtyMAxIhpwqj6EqXimpf2xaH7w19avX3rImL8SUMefcf7lTjLye854xABBJsAkBtdJLJoKDHEKKFo+BCQsrxo5K40v3RTDoKNGoHHICDBiareasV8ovh/Z6586ZWGqtfy8HkDcMnXq0Fhd3euWY9VRvSAM65WpHazeuAlbNjbjtut34bMjfaMNHpcQLDCakJU2Hltm474novAl4JNYGm3jkNncmnzG+9zmt1/b/XEYMfqsz03i0chdTASWgVcLxFgGP/xegDOGKzBeNMmXghuG3srCVQscdPqD8YXTTwFXPsANwUOTUjqf3r770nn3/PiFikBMnzz18vpB/R9mnKLoMJMLAygLz/95OXak07jms0XceFkRfsSHFbhQjNLwsNwqhYf/ftbBPU/3h+MxFJwsbCkgFesotOYv37T6xZc/BhBi1NkTHuFx94uW5ow8hWMxzLmqE2ed5sHRHkQQB2OdACJGxDe1cFw3OwJpJ/CV88fBoTBd9OgX6Xxr+pam+bNvqwjE7KZUKpqM32pK712MkChqgSeefQkF5aAqmsZ1l0h8dVwWiYDBs8iHh67MlRpZxfHrF6vxyz9qeAGDYhJMR5WXbvnVERH7W4fbkzjxlLMv1rXx3wlhV5NLZvDxvQvz+MbFEg4o4LfBWAEiiEJaHjxPYOYDUby63obiEhecegoG1fWneKzrIFYUMvnfK6hvlCvgXaZB+jB61KifRxPxa0M7pOAkrDjtTufwwqsr4ds5aFUDW+VwwViJyV/OoT5Kwp2HZ2sI6Zq6nS+K+NXTdbj/WQ3pJw1TmC/zQXtxJivs+en69ev7pBWjx5x1LCLOgyweHaNZETaL4dLTWjD9iirYYi8UtyBUEQGPIGA+tuyMo2mJj+17B8K3syZ1bxwyHI3HHwVe0ohyKuAXisu8D/1LUvemMvS+XUDcPWmS2zlgwMNOxL00PEEQKpNLbPqwGSvXrkdgeXB8F5oHUFzhxMEcN1+bwbAqBmXTzlsACww9A9/HY69X495HLBSL3DBHeUGryhTnDIjznx6KGSNGnDFM1UTudhOxz5EHs1URXzjDxw1fVnCiRfNaQtko2FlYQQzrt0Vw668FtrfEwOBBwwbXCoPrB+K800aAk4vp5nqlH6xteb/lgh/f92OjW11ATJs2raq2tvZJYVvnhidMacMAsWbLdqzbuNV4CSNGJsBSsLWFUYM7seD6ImqjpOQ+oC1YVLHSEUhexKMrIlj8SBL5IpWXGJgX5P2O3K8k7J+2ZAtb9zYOymHpUrPK44672E7HOqobItZF2rJn8qQ7TGvOYizAuScGmHFtAUkWQMMH046JXimSXf0+x/X/oVDwakxkCRUH42lo7aIm4eCSs8+hDLRLLOk/Kgg2tH7QNuH2e27f2QOIyZMn1/Xv3/8ZYVtjQ8MIjYqqxX/ZsAnvbttRsZxOhdQTBmjM+W4Wn6ktGqZoOLBUAE9oWL6LVZtt3PGQgw9bJQLtgikhtRc0e0quz3mZbUpYWRVIy3HtetdxR7jaGi4Ej/hWhjEZw7XnF/CtzwdwYhkIZRmDpUCNCiRbWx3cdG8U77VacJQPj8cgUG58MSRtG188/+xS7lyOQagmot5rbm6+4K677trRNyCgjet85wBAhHVFjtOOzeH2f/WQiEhoFsCSDrTIQmvH/L63vR/ufrQdL26uQaaoQZkiqT2dM2pkSvMhRX2moK08BrlxfPvzaXzxXB8WkwgYuT7KJwITvX7QYuEHd7vYnOGIBxYKQoCV7hduP0PSsXHZ+LP3tR5LmZqSclO6efeE+b2BCE2j+g/Cdsb1YAQ01m7eijWbtkKX4vXuLlArAcXJjUmMPsbD/G97qI35gHJgG7cqoawAkA48ZWPdFoFfPR3Hyi1kdh6ktk01oURcU0ixEGDsyADf/geF4YOLYLxsclQhC+AGNjICuHlJFV59V4LLGIVSUKKAeDGKokMaEQJRG4viknPOqGAacmN6W/OE+fct/LAHIyZNmuQe0b//Q3Y0cll3IGhh733wEVate9eUwHofXGp43AWnmpVycMHYdsy5shO20PBYFJyFwZfmZDZ0ZxtMBnh7cwKPr1J47wMXrXkNT2okLI0B1S6+cm4OE07MgVtUiA1MadDnFiwpoLmPbBDgF38YiF+8QsmWMAEWCbSti6Zo1DV5oBkG1ddh/GmNXUCU1x94/vrWHa0XlHumPd3niFH/GU3Gr+sNxO50Fs+9tqIiIxQknEDAs3xwzWFB4NJzmnHj5VFYXEJaOTh+zOykKacS7amyxKifJZDJBejM2SgEDHHXQ00SplwvNHkmekEJIS0jxIq0R3u4//kkfvZU1LQRwgIp5TjUQrCgYBlGlRlxwtAhOG340B4FJDJn6QUrmnc3X7Ro0SKTEffYYgqoYtWJprBDayTJ2G4RHI8/+wK8rm52uTdd6lf0ookFH9//SoArz+qAZMLQXUAYj9OXgymOolVAzLeMZ5Chs4RWAZ5fXYemhwLIIkFOTKtwT3pROqt9jDv1JAzu17CfRniZwtLtO3dcvWTJEpMR9wBi5uSpl1cPHvAwA7dM+476A5rDZwLPL1+OPZ1Zc0X5fUz7sULFmkkb1fE07r+hgIEN2rhTU+zrHt4dDBEVmgCXDopOBiJIwNIB3tjqYMoDEfjtURRsD46i6LHCRJEm/RFwIXH5586Dy6kYvs990lhBdm/H3NQP56bKGWgPIFI3pYa41e7rlm3Xh2U3auhScYVj9YYNeGfb9lLvoNScPgAQAZOmIHLcwFbcNzGCRMIzVK/Uza6Eh2RFk8pTvSEw7QONTM7GxP8SWLelCha9qAGAPE5Yq+kh4KbZIzAgGccFZ441nbDuQFDjp+PDlstu+8ntXYXc/dLwUxpPftGOOOeqkjCaPgEDtu/Zi+VvroFvfmfmxgesWNMAgGGsixv/sQVfmpAz4S5DmAEe6qCqtE21DFYAkw58y8O83yTwvyuqEVCZjvIXFUdg5WFV6B0o0iDF0HjsEDQOG2oe1x2IoODt8Nr8U1N3prqaxPu5gdlNs6fHqqLzFCfzoDA2tMG05+H55SuQK/omwjQmcoA30joAUzakKOLIWo0HpvmocfM9ZqYOCobiJmEigtuS4+VNEcz4eRVkgYK0CIQummcrCqMJmF6H0hoOFziX9KE2GZrkvsVqL1P4H18HX02lUl0XVyrVnRGprXoKnNWFIhKG2hRrrn53A9Zt/zCUPsr/aWfCQlZPaqIAyCqA5wybrrkgguv/YQ8k82Ery1wHYgddXwFOHtjw7AK4pj5qBP92fwR/WU+BWam/aUYMqFRX2hCSs26aKblGg2Pj8+eeBcswm9oOpS8o7Rc7s1NumZu6p/ui9wOCQu36urrHnGjknO6UolJ+NpB4atlrKHgEgDb5BnmD/YEoAipiirsBA46uSuO+qRr9kkWjrmU2m+y2whQMfWzcprKxYqvADXdH4ZmRzANxsHeTQGHCmFMwsL4mvL3eB4SWcnduT8fFqTtu+8tBgaCTqZtmfi9WX72YtrtrpsG4JOCt97Zgw5ZtxjyoBiEqLI78u+kwKG7yjRhszPvXVkwY4SMQ5JJpYR64ssNOb6+DKuYUPClp4/r/FHjj3WRYfO2NQ1dDuOcNBtYmMW7MGNgUsxgvF7ZQ6ch3ZJ5oe6fj6wuXLswfEogZE2fUVw1K/NGOuNTuK92CqKiRzhfx0oqV6PTIhkk097d2JrkJoCzF4FsBuHTxtfEdmHZZAF8E4BSWiyKEdA4ABHmKPLbtqsW3lnB0tEfC+aQKQJi5CTMcQS4srJOeN+ZkDG6oNxVTM1NhfLymRKs9/1H6S6lF817qveoDcm1u0+xvO1XRxZxzly4y7VYVZqW70h14YflKoxWoEHYLE3aHgS7VlCylMOxoHw9MyZsU2jUA+eDKDZs1vTUmHJLCKxtimHE/4GvX6MXBgZCmGnfs0Udj7AnDTGZKARyVEglErRV1xZe+uebtqypV0w8IxMzJMwfHGmKP2K5zernJa1IjreELgbc2bMSmLdvhGVdKHenyaBi5VcoUS0ajBSztw3V9PL1AwhFZ0++gcj+jzlQFIMxwFCzc/3wE//WEG96rYlQaDlCQq6cXH1hbg3NOHwPHjB2GtZTybAakbsu1dV6VWjDvmUoe6yDqAzRNvelL8QF1v2GMRUP/QbtCs1IwYfcrr/0ZlIeEczthwYZoWDHaVB4ebfJwRH0ubAVyGh3s4db2ra+Uks/+TRRPvk4VfHph8k4lUehadfiyNORLQddF552F2ojTFcGGTSATTGmvLfffzZ17v3ug0cODAvHQFQ+JDaPe+YmbiH0XID9JUFD1iSjH4Stg1VtrsGP3HrNrdFAqtf8wqZkOwW+ndWLIYFViBGWrJJqVlkBmaGHmAzaeW0Nza5RlWuHwR7evl0eaaVrmnNNORTIaM13wciRP66QZTC9fXJ3dkb1s/n3zTcp92IygC2658cZjE3V1TwrbPj68QUi78khPIQBeeG0FWnMFMEEN36Crz9jjgVrh9zPSOGoAxRJkGmGPtBIQYefdwS0PuHj2bWpuEf8o/iitQCuahDGaZTHgwnPORF2cBDWcoequOxRO59py16ZuSz10IBDo84MyonQha5py8/h4v6pfcsc+smt4pXSSyruBZnh7w0Zs3LYdiohTKRHTHh6f46MhmQ1Nw7QED2QaZAoCc34bwx9ejxgW0u9dA2lU3SJNaGjAKaNHoioSody0ZDr7RFVJVch3pBdhT/PcTzxMVkZxzs2z/sWtSSzmXMRKalCKOX3jOHxw7GzpxPLVlI/s3+sVyOOFHztwRbMp4AScEjpe0X3S1pM43vFILR5eRvJD+0WmEcYSFNXSaOGJw46DY9hTmuU0GW55ug6qmM4ufWvd2qv70nPtCyMMFpMnT47WJ5Lft6tiN9OsZRebys6CXCXFGZkM1m3fhQ927UTRp4wzHGmojgd4dm7GVKqoqiQZeYysKfSaRYSVlC6z87jAg09HsPiPsfDdCAAGHFFXi+OHDjE/DQsqaYzS0ssV/zfXmf+3+XfOf/9gJlE+12cgupgx69abIsn4rSyML/bpt/EaYUuIGq7pfA5vb3gXH+7di6IGhg7O4jdTiTcKXJk5WlPGM7FICYLwdmHCRUHYE6s05jxow9EJNERsNI4eifpaAoCy25JO7R/HqGI690ysI/HVKQun9IgeP6lG9Lh+6tSp8Son9i03GbtZ2FY/M4Vb2sd907hUyWamOtWRzWJvaxvqI7vwgy+3I55oDXdSOhBcEo0M5TUlYjQWSEBKC1kZwfK1dXhs2dGo7p9Av6qEqTuWkS8H5uQ6y90rJVXeyxYezXbkZi5YtGBbX5jwsRnRxYzps660aqJ3CdseQNtYbqCECVM4u1Ae2yeukOJHkEfSKWJAfTvqa9qQiOdgm4qzC+lFkc87yKQ13m/vj5bOWuNCqVslLVkq13UncCkvVqGLVFLmi+ncojXvrm/qiyb0BumwTaN8gxRSXP57+hS7oXamE3UuE4yHoaQJ9so7Fyq5MXGKNhGDYNT2LCVQZuC89A1iBaXmlJBR5UlTa5HmoqJhiGxSd1OmLf0sFQcYowH0t4KcN691Q8fTvZOpvrLiYwNRfsDUb0yNR4+wJybqqycySxxJ0+pkLl2Uqxgw9XV5lb9XMgWlAtnmpfMPy9ZsKvX/+KdM3VfJUjenTrKEvlpEI1cKxzryrwmE9IOWoOg/pQrez9Umsbwv0/eHgv4TM6L3A1LXzzjBqnOnWLHIBC7EIMbNJBw/GEt6/c1n1y3LnzPGlFba10ru8XKF12Q6tzB11+0rDndm81P1GodCls7TrMXIgccMtpLRRm6LMZyz8UyIYcKy6sBBbrfrDzt7116N56GsjoaklMoGXrBDS/mK1voVlfNWy63W1k+DAZ+aWPYFkG7fYTMmTqzjzBlqJ6KNlrBHcZv301w0cIsnBeNUw5FKyrT2ZQvT2Kl9/63M3tzrhbh6f+HCntWkw3x2n77+qZtGn54KsNT48QL9xvNMZLPNbZtn0hEtMsKvz9fL1EspchF9a4v18YGH+tr/FxCHWtff/PzfgShB/n8/+M/3KRvIBAAAAABJRU5ErkJggg=="
					alt="company-logo"
				></img>
				<p className="align-self-end" style={{ marginLeft: "20px" }}>
					MyWays
				</p>
			</div>
			<div>
				{!token && (
					<>
						<button
							className="btn-outline btn-color"
							onClick={() => setShowModel(true)}
						>
							Log In
						</button>
						<button
							className="btn-secondary-color btn-outline mr-4"
							onClick={() => setShowSignUpModel(true)}
						>
							Sign Up
						</button>
					</>
				)}
				{token && (
					<>
						{userData?.user?.accountUser === "Admin" && (
							<button
								className="btn-outline btn-color"
								onClick={() => {
									navigate("/post/create");
								}}
							>
								Create Post
							</button>
						)}
						<button
							className="btn-secondary-color btn-outline mr-4"
							onClick={() => {
								localStorage.removeItem("token");
								setToken(null);
								setUserData({});
								handleRelaod && handleRelaod("logout");
								navigate("/");
							}}
						>
							Log Out
						</button>
					</>
				)}
			</div>
			<LoginModle
				show={showModel}
				handleClose={() => setShowModel(false)}
				handleSignUp={() => {
					setShowModel(false);
					setShowSignUpModel(true);
				}}
				handleSubmitData={handleSubmit}
			/>
			<SignUpModel
				show={showSignUpModel}
				handleClose={() => setShowSignUpModel(false)}
				handleLogin={() => {
					setShowSignUpModel(false);
					setShowModel(true);
				}}
				handleSubmitData={handleSubmitData}
			/>
		</div>
	);
};

export default NavBar;
