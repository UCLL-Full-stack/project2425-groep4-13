import { Family } from '@/types';
import React from 'react';

type Props = {
  families: Array<Family>;
};

const FamiliesOverviewTable: React.FC<Props> = ({ families }: Props) => {
  return (
    <>
      {families && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {families.map((family, index) => (
              <tr key={index} onClick={() => { }} role="button">
                <td>{family.name}</td>
                <td>
                  <ul>
                    {family.members.map((member, memberIndex) => (
                      <li>{member.firstName + " " + member.lastName}</li>
                    ))
                    }
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default FamiliesOverviewTable;
