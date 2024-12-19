import { Family } from '@types';
import React from 'react';

type Props = {
  family: Family;
};

const FamiliesOverviewTable: React.FC<Props> = ({ family }: Props) => {
  return (
    <>
      {family && (
        <div className="bg-neutral-200 border-2 border-mediumgray rounded shadow-md p-5 text-center">
          <h1 className='text-start text-2xl font-bold'>{family.name}</h1>
          <table className='w-full table-fixed mt-5'>
            <thead className='bg-darkgreen text-whitesmoke w-full'>
              <tr className=''>
                <th scope="col" className='w-1/2'>Name</th>
                <th scope="col" className='w-1/2'>Email</th>
              </tr>
            </thead>
            <tbody>
              {family.members.map((member, memberIndex) => (
                <tr key={memberIndex} onClick={() => { }} role="button">
                  <td>{member.firstName + " " + member.lastName}</td>
                  <td>{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default FamiliesOverviewTable;