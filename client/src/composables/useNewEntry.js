import { useRouter } from "vue-router";

const useNewEntry = () => {
  const router = useRouter();

  const navigateToRoute = (currentRoute) => {
    switch (currentRoute) {
      //DEVICES
      case "Servers":
        router.push("/devices/servers/add");
        break;
      case "Desktops":
        router.push("/devices/desktops/add");
        break;
      case "Laptops":
        router.push("/devices/laptops/add");
        break;
      case "UPSuppliers":
        router.push("/devices/ups/add");
        break;
      case "Tablets":
        router.push("/devices/tablets/add");
        break;
      case "Cellphones":
        router.push("/devices/cellphones/add");
        break;

      //OFFICE-EQUIPMENT
      case "Printers":
        router.push("/office-equipment/printers/add");
        break;
      case "Scanners":
        router.push("/office-equipment/scanners/add");
        break;

      // NETWORKING ROUTES
      case "Routers":
        router.push("/networking/routers/add");
        break;
      case "Switches":
        router.push("/networking/switches/add");
        break;
      case "Converters":
        router.push("/networking/converters/add");
        break;
      case "WiFi":
        router.push("/networking/wifi/add");
        break;
      case "NetworkConfig":
        router.push("/networking/config/add");
        break;

      //OTHERS
      case "Telephones":
        router.push("/telephones/add");
        break;
      case "Remote Desktop":
        router.push("/remote/add");
        break;
      case "EmailList":
        router.push("/emails/add");
        break;
      case "EmailConfig":
        router.push("/emails/config/add");
        break;
      case "Software":
        router.push("/software/add");
        break;
    }
  };

  return { navigateToRoute };
};

export default useNewEntry;
