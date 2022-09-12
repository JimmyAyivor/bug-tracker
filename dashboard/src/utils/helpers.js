import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function getFriendlyDate(date) {
  return new Date(date).toLocaleDateString();
}

export function percIncrease(a, b) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}

export function getDaysPast(date) {
  const oldDate = new Date(date);
  const timeDiffernce = new Date().getTime() - oldDate.getTime();
  const daysPast = timeDiffernce / (1000 * 3600 * 24);
  return daysPast.toFixed(0);
}

export function getIconType(daysGoneBy) {
  if (daysGoneBy > 20) {
    return <i className='fa fa-circle text-c-red f-10 m-r-15' />;
  }
  if (daysGoneBy > 10 && daysGoneBy < 21) {
    return <i className='fa fa-circle text-c-yellow f-10 m-r-15' />;
  }
  return <i className='fa fa-circle text-c-green f-10 m-r-15' />;
}

export function actionsFormatter(cell, row ) {
  if(row){
    return (
      <>
        <span className='table-remove'>
          <Link to={`/projects/${row.id}`}>
            <Button type='button' className='btn btn-primary'>
              <i className='far fa-eye'></i>
            </Button>
          </Link>
          <Link to={`/projects/${row.id}/edit`}>
            <Button type='button' className='btn btn-success'>
              <i className='fas fa-edit'></i>
            </Button>
          </Link>
        </span>
      </>
    );

  }
  
  
  
  return (
    <>
      <span className='table-remove'>
        <Link to={`/tickets/${row.id}`}>
          <Button type='button' className='btn btn-primary'>
            <i className='far fa-eye'></i>
          </Button>
        </Link>
        <Link to={`/tickets/${row.id}/edit`}>
          <Button type='button' className='btn btn-success'>
            <i className='fas fa-edit'></i>
          </Button>
        </Link>
      </span>
    </>
  );
}

export function priorityFormatter(cell, row) {
  if (row === "priority_actions") {
    return (
      <h6>
        <span className='label label-danger'> {cell}</span>
      </h6>
    );
  }

  return <span>$ {cell} NTD</span>;
}

export function dateFormatter(cell, row) {
  if (row.created_at) {
    return getFriendlyDate(cell);
  }
}
