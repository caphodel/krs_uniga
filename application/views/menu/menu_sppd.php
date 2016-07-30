HOME;load("sppd_home/index?"+randomString(),"#content");sppdhome
FPPD;load("sppd_fppd/index?user="+user,"#content");fppd
FDPD;load("sppd_fdpd/index?user="+user,"#content");fdpd
REPORT;;sppdreport
	FPPD;load("sppd_report/fppd?user="+user,"#content");reportfppd
	FDPD;load("sppd_report/fdpd?user="+user,"#content");reportfdpd
SYSTEM ADMINISTRATION;;sppdadmin
	USER MANAGEMENT;load("sppd_settings/index?"+randomString(),"#content");sppduser
	MASTER;load("sppd_settings/master?"+randomString(),"#content");sppdmaster